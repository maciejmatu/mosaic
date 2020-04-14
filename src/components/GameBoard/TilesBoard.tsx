import times from "lodash/times";
import React from "react";
import { GameTileType } from "../../game";
import { useBoardContext } from "./BoardContext";
import { TileFull, TileEmptySlot } from "./Tile";
import classNames from "classnames";
import sortBy from "lodash/sortBy";

export const TilesBoard = () => {
  const { State, selectedTiles, setSelectedTiles, ctx } = useBoardContext();

  return (
    <div
      className={classNames(
        "TilesBoard",
        `TilesBoard--${ctx.numPlayers}-players`
      )}
    >
      {State.tileGroups.map((tileGroup, tileGroupIndex) => {
        return (
          <div key={tileGroupIndex} className="TilesBoard__tile TilesContainer">
            {times(4, (index) => {
              const tile = tileGroup[index];

              if (tile) {
                const isSelected = !!selectedTiles?.tiles.find(
                  ({ id }) => id === tile.id
                );

                return (
                  <TileFull
                    type={tile.type}
                    onClick={() => {
                      setSelectedTiles({
                        groupId: tileGroupIndex,
                        tiles: tileGroup.filter(
                          ({ type }) => tile.type === type
                        ),
                      });
                    }}
                    key={tile.id}
                    isSelected={isSelected}
                  />
                );
              }

              return <TileEmptySlot key={`empty-tile-${index}`} />;
            })}
          </div>
        );
      })}

      <div className="TilesBoard__middle">
        {/* render special begin tile */}
        {!State.beginTileOwner && (
          <TileFull
            type={GameTileType.BEGIN}
            isSelected={selectedTiles?.groupId === "middle"}
          />
        )}

        {sortBy(State.tileMiddleGroup, "type").map((tile) => {
          const isSelected = !!selectedTiles?.tiles.find(
            ({ id }) => id === tile.id
          );

          return (
            <TileFull
              type={tile.type}
              key={tile.id}
              isSelected={isSelected}
              onClick={() => {
                setSelectedTiles({
                  groupId: "middle",
                  tiles: State.tileMiddleGroup.filter(
                    ({ type }) => tile.type === type
                  ),
                });
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
