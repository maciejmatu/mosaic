import React, { useState } from "react";
import { GameState, GameTileType, GameTile } from "../../game";
import { BoardProps } from "boardgame.io/react";
import "../../styles/board.scss";
import { times, map } from "lodash";
import cn from "classnames";

export const GameBoard: React.FC<BoardProps<GameState>> = ({
  G: State,
  moves,
  isActive,
  ctx,
  playerID,
  undo
}) => {
  const tileColorModifier: { [key in GameTileType]: string } = {
    [GameTileType.A]: "type-a",
    [GameTileType.B]: "type-b",
    [GameTileType.C]: "type-c",
    [GameTileType.D]: "type-d",
    [GameTileType.E]: "type-e"
  };

  const [selectedTiles, setSelectedTiles] = useState<
    { tiles: GameTile[]; groupId: number | "middle" } | undefined
  >(undefined);

  const pickTiles = (
    tileIds: GameTile[],
    tileGroupId: number | "middle",
    targetSlotId: number | "minus-points"
  ) => {
    if (!isActive) return;

    moves.pickTiles(tileIds, tileGroupId, targetSlotId);
    setSelectedTiles(undefined);
  };

  const playerBoard = State.players[playerID];

  return (
    <>
      <button
        className="Button"
        key={playerID}
        onClick={() => {
          moves.endTurn();
        }}
        disabled={!ctx.numMoves}
      >
        END TURN
      </button>

      <button className="Button" onClick={() => undo()}>
        UNDO
      </button>

      <div className="Scoreboard">
        {map(State.scoreboard, (userScore, userId) => {
          return (
            <span key={userId}>
              User {userId}: {userScore} |
            </span>
          );
        })}
      </div>

      <div className="GameBoard">
        {State.tileGroups.map((tileGroup, tileGroupIndex) => {
          return (
            <div key={tileGroupIndex} className="TilesContainer">
              {times(4, index => {
                const tile = tileGroup[index];

                if (tile) {
                  const isSelected = selectedTiles?.tiles.find(
                    ({ id }) => id === tile.id
                  );

                  return (
                    <div
                      onClick={() => {
                        setSelectedTiles({
                          groupId: tileGroupIndex,
                          tiles: tileGroup.filter(
                            ({ type }) => tile.type === type
                          )
                        });
                      }}
                      key={tile.id}
                      className={cn(
                        "Tile",
                        `Tile--${tileColorModifier[tile.type]}`,
                        {
                          "Tile--selected": isSelected
                        }
                      )}
                    >
                      {tile.id}
                    </div>
                  );
                }

                return (
                  <div key={`fill-${index}`} className="Tile Tile--skeleton" />
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="TilesMiddleContainer">
        {/* render special begin tile */}
        {!State.beginTileOwner && (
          <div
            className={cn("Tile", `Tile--type-begin`, {
              "Tile--selected": selectedTiles?.groupId === "middle"
            })}
          >
            B
          </div>
        )}

        {State.tileMiddleGroup.map(tile => {
          const isSelected = selectedTiles?.tiles.find(
            ({ id }) => id === tile.id
          );

          return (
            <div
              key={tile.id}
              className={cn("Tile", `Tile--${tileColorModifier[tile.type]}`, {
                "Tile--selected": isSelected
              })}
              onClick={() => {
                setSelectedTiles({
                  groupId: "middle",
                  tiles: State.tileMiddleGroup.filter(
                    ({ type }) => tile.type === type
                  )
                });
              }}
            >
              {tile.id}
            </div>
          );
        })}
      </div>

      {/* <h2>Tiles in pool</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {State.tilesInPool.map(tile => {
          return (
            <div
              key={tile.id}
              style={{ marginRight: 5 }}
              className={cn("Tile", `Tile--${tileColorModifier[tile.type]}`)}
            >
              {tile.id}
            </div>
          );
        })}
      </div> */}

      {/* <h2>Used tiles</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {State.usedTiles.map(tile => {
          return (
            <div
              key={tile.id}
              style={{ marginRight: 5 }}
              className={cn("Tile", `Tile--${tileColorModifier[tile.type]}`)}
            >
              {tile.id}
            </div>
          );
        })}
      </div> */}

      <div>
        <h4>Player board</h4>
        <div className="PlayerBoard">
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
                        <div
                          key={tile.id}
                          className={`TemporarySlot__tile Tile Tile--${
                            tileColorModifier[tile.type]
                          }`}
                        >
                          {tile.id}
                        </div>
                      ) : (
                        <div
                          key={`fill-${index}`}
                          className="TemporarySlot__tile Tile Tile--skeleton"
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
                    return (
                      <div
                        key={`${rowIndex}-${slotIndex}`}
                        className={cn(
                          "Tile",
                          `Tile--${tileColorModifier[slot.type]}`,
                          "SlotRow__tile",
                          {
                            "SlotRow__tile--filled": !!slot.tile
                          }
                        )}
                      >
                        {slot.tile?.id}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div
            className="PlayerBoard__minus-points"
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
            {times(7, index => {
              const tile = playerBoard.minusPoints[index];

              if (tile === "begin-tile") {
                return (
                  <div
                    key="begin-tile"
                    className={cn(
                      "Tile",
                      "TemporarySlot__tile",
                      `Tile--type-begin`
                    )}
                  >
                    B
                  </div>
                );
              }

              return tile ? (
                <div
                  key={tile.id}
                  className={`TemporarySlot__tile Tile Tile--${
                    tileColorModifier[tile.type]
                  }`}
                >
                  {tile.id}
                </div>
              ) : (
                <div
                  key={`fill-${index}`}
                  className="TemporarySlot__tile Tile Tile--skeleton"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
