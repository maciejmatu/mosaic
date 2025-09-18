import times from "lodash/times";

import { GameTileType } from "../../game";
import { useBoardContext } from "./BoardContext";
import { TileFull, TileEmptySlot } from "./Tile";
import classNames from "classnames";
import sortBy from "lodash/sortBy";

export const TilesBoard = () => {
  const { State, selectedTiles, setSelectedTiles, ctx } = useBoardContext();

  const isFourPlayers = ctx.numPlayers === 4;
  const isThreePlayers = ctx.numPlayers === 3;

  return (
    <div
      className={classNames(
        "TilesBoard",
        isFourPlayers && "TilesBoard--4-players",
        isThreePlayers && "TilesBoard--3-players"
      )}
    >
      {State.tileGroups.map((tileGroup, tileGroupIndex) => {
        return (
          <div
            key={tileGroupIndex}
            className={classNames("TilesContainer", "TilesBoard__tile")}
          >
            {times(4, (index) => {
              const tile = tileGroup[index];

              if (tile) {
                const isSelected = !!selectedTiles?.tiles.find(
                  ({ id }) => id === tile.id
                );

                return (
                  <TileFull
                    movable
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
              movable
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
