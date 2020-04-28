import times from "lodash/times";
import React from "react";
import { GameTileType, Player } from "../../game";
import { useBoardContext } from "./BoardContext";
import cn from "classnames";
import { TileEmptySlot, TileFull, TileTypeSlot } from "./Tile";
import { Trans } from "react-i18next";
import { PlayerControls } from "./PlayerControls";
import classNames from "classnames";

function getMinusPointsForIndex(value: number): number | null {
  switch (value) {
    case 0:
    case 1:
      return -1;
    case 2:
    case 3:
    case 4:
      return -2;
    case 5:
    case 6:
      return -3;
    default:
      return null;
  }
}

export const PlayerBoardLayout: React.FC<{
  playerBoard: Player;
  className?: string;
  onMinusPointsClick?(): void;
  onSlotClick?(slotIndex: number): void;
  minimal?: boolean;
  highlitedRowsIndeces?: (number | "minus-points")[];
}> = ({
  playerBoard,
  className,
  onMinusPointsClick,
  onSlotClick,
  highlitedRowsIndeces,
  children,
  minimal = false,
}) => {
  return (
    <div
      className={cn(
        "PlayerBoard",
        minimal && "PlayerBoard--minimal",
        className
      )}
    >
      {children}

      <div
        className={classNames("PlayerBoard__minus-points", "MinusPoints", {
          "MinusPoints--clickable": onMinusPointsClick,
          "MinusPoints--highlited": highlitedRowsIndeces?.includes(
            "minus-points"
          ),
        })}
        onClick={onMinusPointsClick}
      >
        {times(7, (index) => {
          const tile = playerBoard.minusPoints[index];
          const valueForIndex = getMinusPointsForIndex(index);

          const Wrapper = ({ children }) => (
            <div className="MinusPoints__item">
              <span className="MinusPoints__penalty">{valueForIndex}</span>
              {children}
            </div>
          );

          if (tile === "begin-tile") {
            return (
              <Wrapper key="begin-tile">
                <TileFull
                  type={GameTileType.BEGIN}
                  className="MinusPoints__tile"
                />
              </Wrapper>
            );
          }

          return tile ? (
            <Wrapper key={tile.id}>
              <TileFull className="MinusPoints__tile" type={tile.type} />
            </Wrapper>
          ) : (
            <Wrapper key={`fill-${index}`}>
              <TileEmptySlot className="MinusPoints__tile" />
            </Wrapper>
          );
        })}
      </div>

      <div className="PlayerBoard__left">
        {playerBoard.leftSlots.map((slot, slotIndex) => {
          return (
            <div
              className={classNames("TemporarySlot", {
                "TemporarySlot--clickable": onSlotClick,
                "TemporarySlot--highlighted": highlitedRowsIndeces?.includes(
                  slotIndex
                ),
              })}
              key={slotIndex}
              onClick={() => onSlotClick && onSlotClick(slotIndex)}
            >
              {slot
                .slice()
                .reverse()
                .map((tile, index) => {
                  return tile ? (
                    <TileFull
                      key={tile.id}
                      type={tile.type}
                      className="TemporarySlot__tile"
                    />
                  ) : (
                    <TileEmptySlot
                      key={`empty-tile-${index}`}
                      className="TemporarySlot__tile"
                    />
                  );
                })}
            </div>
          );
        })}
      </div>

      <div className="PlayerBoard__right">
        {playerBoard.rightSlots.map((slotRow, rowIndex) => {
          return (
            <div className="SlotRow" key={rowIndex}>
              {slotRow.map((slot, slotIndex) => {
                const tileProps = {
                  type: slot.type,
                  key: `${rowIndex}-${slotIndex}`,
                  className: "SlotRow__tile",
                };

                return slot.tile ? (
                  <TileFull {...tileProps} />
                ) : (
                  <TileTypeSlot {...tileProps} />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const PlayerBoard = () => {
  const {
    State,
    playerID,
    selectedTiles,
    pickTiles,
    playersInfo,
    isActive,
    ctx,
  } = useBoardContext();

  const playerBoard = State.players[playerID];

  const currentPlayerName = playersInfo.find(
    (p) => String(p.id) === ctx.currentPlayer
  )!.name;

  const highlitedRowsIndeces: (number | "minus-points")[] = [];

  if (isActive && selectedTiles) {
    highlitedRowsIndeces.push("minus-points");
  }

  playerBoard.leftSlots.forEach((row, index) => {
    if (!selectedTiles || !isActive) return;

    // TODO: some of those checks are duplicated in `game` logic,
    // they can be extracted to helper functions or enclosed in
    // an object method (depending on the fp/oop approach)
    const hasEmptySlots =
      row.length !== row.reduce((count, tile) => count + (tile ? 1 : 0), 0);
    const canPlaceColorRight = !playerBoard.rightSlots[index].find(
      (slot) => slot.type === selectedTiles.tiles[0].type
    )?.tile;
    const canPlaceColorLeft = row[0]
      ? row[0].type === selectedTiles.tiles[0].type
      : true;

    if (hasEmptySlots && canPlaceColorLeft && canPlaceColorRight) {
      highlitedRowsIndeces.push(index);
    }
  });

  return (
    <div>
      <PlayerControls />
      <PlayerBoardLayout
        className={isActive ? "PlayerBoard--active" : "PlayerBoard--waiting"}
        playerBoard={playerBoard}
        highlitedRowsIndeces={highlitedRowsIndeces}
        onMinusPointsClick={() => {
          if (selectedTiles) {
            pickTiles(
              selectedTiles?.tiles,
              selectedTiles?.groupId,
              "minus-points"
            );
          }
        }}
        onSlotClick={(slotIndex) => {
          if (selectedTiles) {
            pickTiles(selectedTiles?.tiles, selectedTiles?.groupId, slotIndex);
          }
        }}
      >
        <span className="PlayerBoard__hint">
          {isActive ? (
            ctx.numMoves > 0 ? (
              <Trans>End turn or undo move</Trans>
            ) : (
              <Trans>Make a move</Trans>
            )
          ) : (
            <Trans>
              <span className="PlayerBoard__hint-accent">
                {{ currentPlayerName }}
              </span>{" "}
              is making a move...
            </Trans>
          )}
        </span>
      </PlayerBoardLayout>
    </div>
  );
};
