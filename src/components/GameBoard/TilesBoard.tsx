import times from "lodash/times";
import React from "react";
import { GameTileType } from "../../game";
import { useBoardContext } from "./BoardContext";
import { TileFull, TileEmptySlot } from "./Tile";

export const TilesBoard = () => {
  const { State, selectedTiles, setSelectedTiles } = useBoardContext();

  return (
    <>
      <div className="GameBoard__tiles">
        {State.tileGroups.map((tileGroup, tileGroupIndex) => {
          return (
            <div key={tileGroupIndex} className="TilesContainer">
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
      </div>

      <div className="TilesMiddleContainer">
        {/* render special begin tile */}
        {!State.beginTileOwner && (
          <TileFull
            type={GameTileType.BEGIN}
            isSelected={selectedTiles?.groupId === "middle"}
          />
        )}

        {State.tileMiddleGroup.map((tile) => {
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
    </>
  );
};
