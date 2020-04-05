import React from "react";
import { useBoardContext } from "./BoardContext";
import times from "lodash/times";
import cn from "classnames";
import { tileColorModifier } from ".";

export const TilesBoard = () => {
  const { State, selectedTiles, setSelectedTiles } = useBoardContext();

  return (
    <>
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
    </>
  );
};
