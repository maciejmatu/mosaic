import times from "lodash/times";
import React from "react";
import { GameTileType } from "../../game";
import { useBoardContext } from "./BoardContext";
import cn from "classnames";
import { TileEmptySlot, TileFull, TileTypeSlot } from "./Tile";
import { Trans } from "react-i18next";
import { PlayerControls } from "./PlayerControls";

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

  return (
    <div>
      <PlayerControls />
      <div className={cn("PlayerBoard", isActive && "PlayerBoard--active")}>
        <div
          className="PlayerBoard__minus-points MinusPoints"
          onClick={() => {
            if (selectedTiles) {
              pickTiles(
                selectedTiles?.tiles,
                selectedTiles?.groupId,
                "minus-points"
              );
            }
          }}
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
        <div className="PlayerBoard__left">
          {playerBoard.leftSlots.map((slot, slotIndex) => {
            return (
              <div
                className="TemporarySlot"
                key={slotIndex}
                onClick={() => {
                  if (selectedTiles) {
                    pickTiles(
                      selectedTiles?.tiles,
                      selectedTiles?.groupId,
                      slotIndex
                    );
                  }
                }}
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
    </div>
  );
};
