import { times, dropRight, partition, each, shuffle } from "lodash";
import { INVALID_MOVE } from "boardgame.io/core";
import { GAME_ID } from "../config";

type PlayerID = string;

export interface Player {
  id: PlayerID;
  leftSlots: (GameTile | null)[][];
  rightSlots: PermanentSlot[][];
  minusPoints: (GameTile | "begin-tile")[];
}

export interface PermanentSlot {
  type: GameTileType;
  tile?: GameTile;
  rowIndex: number;
  colIndex: number;
}

export interface ScoreBoard {
  [key: string]: number;
}

export interface GameState {
  tilesInPool: GameTile[];
  usedTiles: GameTile[];
  tileGroups: GameTile[][];
  tileMiddleGroup: GameTile[];
  scoreboard: ScoreBoard;
  beginTileOwner: null | PlayerID; // null means tile is in the middle group
  players: { [key: string]: Player };
  shouldEndGame: boolean;
}

export enum GameTileType {
  A = "tile-a",
  B = "tile-b",
  C = "tile-c",
  D = "tile-d",
  E = "tile-e"
}

export interface GameTile {
  type: GameTileType; // e.g. in UI shows different color
  id: string;
}

const TILE_TYPE_COUNT = 20; // defined by game rules
const DEFAULT_TILE_ORDER = [
  GameTileType.A,
  GameTileType.B,
  GameTileType.C,
  GameTileType.D,
  GameTileType.E
];
// specifies how much minus points user gets for each item
const INDEX_TO_MINUS_POINTS = [1, 1, 2, 2, 2, 3, 3];
const PLAYERS_COUNT_TO_GROUPS = {
  2: 5,
  3: 7,
  4: 9
};

function shiftBy<T>(offset: number, list: Array<T>): Array<T> {
  return offset < 1
    ? list
    : list.slice(-offset).concat(dropRight(list, offset));
}

function shouldReinitialize(state: GameState) {
  return (
    state.tileGroups.flat().length <= 0 && state.tileMiddleGroup.length <= 0
  );
}

function getTileGroups(
  tiles: GameTile[],
  usedTiles: GameTile[],
  groupCount: 5 | 7 | 9
) {
  const tileGroups = times<GameTile[]>(groupCount, () => []);
  const idsToRemove: string[] = [];
  let updatedTiles = tiles;
  let clearUsedTiles = false;

  for (let i = 0; i < groupCount * 4; i++) {
    let tile = updatedTiles[i];

    if (!tile && usedTiles.length > 0) {
      // TODO: replace shuffle with ctx.random.Shuffle to be consistent
      updatedTiles.push(...shuffle(usedTiles));
      clearUsedTiles = true;
      tile = updatedTiles[i];
    }

    if (tile) {
      idsToRemove.push(tile.id);
      tileGroups[i % groupCount].push(tile);
    }
  }

  updatedTiles = updatedTiles.filter(t => !idsToRemove.includes(t.id));

  return {
    tileGroups,
    updatedUsedTiles: clearUsedTiles ? [] : usedTiles,
    updatedTilesInPool: updatedTiles
  };
}

export const MosaicGame = {
  name: GAME_ID,

  setup: (ctx, setupData) => {
    // generate 20 tiles for each tile type
    const tiles: GameTile[] = ctx.random.Shuffle(
      DEFAULT_TILE_ORDER.flatMap((tileType, groupIndex) => {
        return times<GameTile>(TILE_TYPE_COUNT, (index: number) => {
          return {
            type: tileType,
            id: String(groupIndex * TILE_TYPE_COUNT + index)
          };
        });
      })
    );

    // create empty array for used tiles that will come back
    // to the tiles pool after a whole round
    const usedTiles: GameTile[] = [];

    const { updatedTilesInPool, updatedUsedTiles, tileGroups } = getTileGroups(
      tiles,
      usedTiles,
      PLAYERS_COUNT_TO_GROUPS[ctx.numPlayers]
    );

    const scoreboard = {};
    const players = {};

    times(ctx.numPlayers, index => {
      const id = index.toString();
      const initialPlayer: Player = {
        id,
        // temporary board
        leftSlots: [
          Array(1).fill(null),
          Array(2).fill(null),
          Array(3).fill(null),
          Array(4).fill(null),
          Array(5).fill(null)
        ],
        // permanent board
        rightSlots: times(5, rowIndex => {
          return shiftBy(rowIndex, DEFAULT_TILE_ORDER).map(
            (tileType, colIndex) => ({
              type: tileType,
              filled: false,
              colIndex,
              rowIndex
            })
          );
        }),
        minusPoints: []
      };

      players[id] = initialPlayer;
      scoreboard[id] = 0; // initialize with 0 points
    });

    const initialState: GameState = {
      tilesInPool: updatedTilesInPool,
      usedTiles: updatedUsedTiles,
      tileGroups,
      beginTileOwner: null,
      scoreboard,
      tileMiddleGroup: [],
      players,
      shouldEndGame: false
    };

    return initialState;
  },

  endIf: (G: GameState, ctx) => {
    if (G.shouldEndGame) {
      console.log("END GAME");
      // count bonus points

      each(G.players, player => {
        const bonusRows: number[] = []; // array of row ids
        const bonusColors: GameTileType[] = [];
        const bonusColumns: number[] = []; // array of col ids

        const tileTypeCount: object = {};
        const tileColumnCount: object = {};

        player.rightSlots.forEach(slotRow => {
          let filledSlotRows = 0;

          slotRow.forEach(slot => {
            if (slot.tile) {
              filledSlotRows++;
              tileTypeCount[slot.tile.type] =
                tileTypeCount[slot.tile.type] + 1 || 1;

              if (tileTypeCount[slot.tile.type] === 5) {
                bonusColors.push(slot.tile.type);
              }

              tileColumnCount[slot.colIndex] =
                tileColumnCount[slot.colIndex + 1] || 1;

              if (tileColumnCount[slot.colIndex] === 5) {
                bonusColumns.push(slot.colIndex);
              }
            }
          });

          if (filledSlotRows === slotRow.length) {
            bonusRows.push(slotRow[0].rowIndex);
          }
        });

        const rowBonusPoints = bonusRows.length * 2; // +2 points per row
        const columnBonusPoints = bonusColumns.length * 8; // +8 points per color
        const colorBonusPoints = bonusColors.length * 10; // +10 points per color

        G.scoreboard[player.id] +=
          rowBonusPoints + columnBonusPoints + colorBonusPoints;
      });

      let winner = { score: 0, id: "" };

      each(G.scoreboard, (score, playerId) => {
        if (score > winner.score) {
          winner.score = score;
          winner.id = playerId;
        }
      });

      // select winner
      return {
        winner
      };
    } else {
      return false;
    }
  },

  moves: {
    endTurn: {
      undoable: false,
      client: false,
      move: (G: GameState, ctx) => {
        let overrideNextUser: PlayerID | null = null;

        if (shouldReinitialize(G)) {
          let shouldEndGame = false;
          // count points
          each(G.players, player => {
            let points = 0;

            // move tiles from left to right
            player.leftSlots.forEach((slotRow, rowIndex) => {
              if (slotRow.includes(null)) return;
              // if doesn't include null we can consider it filled
              const filledRowTiles = slotRow as GameTile[];

              const [firstTile, ...restTiles] = filledRowTiles;
              const targetSlot = player.rightSlots[rowIndex].find(
                slot => slot.type === firstTile.type
              );

              if (!targetSlot) {
                throw new Error("Unexpected behaviour: missing right tile");
              }

              G.usedTiles.push(...restTiles);
              targetSlot.tile = firstTile;

              // count row points for moved tile
              points++; // add one point by default

              let colRightIndex = targetSlot.colIndex + 1;
              let colLeftIndex = targetSlot.colIndex - 1;
              const row = player.rightSlots[targetSlot.rowIndex];
              let hasRowPoints = false;

              // counts right adjacent tile points
              while (row[colRightIndex]?.tile) {
                hasRowPoints = true;
                colRightIndex++;
                points++;
              }

              // counts left adjacent tile points
              while (row[colLeftIndex]?.tile) {
                hasRowPoints = true;
                colLeftIndex--;
                points++;
              }

              const columnAsList = player.rightSlots.map(row => {
                return row.find(slot => slot.colIndex === targetSlot.colIndex)!;
              });
              let rowRightIndex = targetSlot.rowIndex + 1;
              let rowLeftIndex = targetSlot.rowIndex - 1;
              let hasColumnPoints = false;

              // counts right adjacent tile points
              while (columnAsList[rowRightIndex]?.tile) {
                hasColumnPoints = true;
                rowRightIndex++;
                points++;
              }

              // counts left adjacent tile points
              while (columnAsList[rowLeftIndex]?.tile) {
                hasColumnPoints = true;
                rowLeftIndex--;
                points++;
              }

              // count placed tile second time for column
              if (hasRowPoints && hasColumnPoints) points++;

              // reset rows on the left, for filled tiles
              slotRow.length = rowIndex + 1;
              slotRow.fill(null);
            });

            // count minus points
            let minusPoints = 0;
            player.minusPoints.forEach((_, index) => {
              minusPoints += INDEX_TO_MINUS_POINTS[index] || 0;
            });

            player.minusPoints = [];

            // check if should end game
            player.rightSlots.forEach(row => {
              let filledSlotsCount = 0;
              row.forEach(slot => {
                if (slot.tile) filledSlotsCount++;
              });

              // set shouldEndGame flag to true if all tiles in a row are filled
              if (filledSlotsCount === row.length) {
                shouldEndGame = true;
              }
            });

            G.scoreboard[player.id] += points - minusPoints;
          });

          if (shouldEndGame) {
            G.shouldEndGame = true;
          }

          // start next pickTiles phase
          const {
            updatedTilesInPool,
            updatedUsedTiles,
            tileGroups
          } = getTileGroups(
            G.tilesInPool,
            G.usedTiles,
            PLAYERS_COUNT_TO_GROUPS[ctx.numPlayers]
          );

          G.usedTiles = updatedUsedTiles;
          G.tileGroups = tileGroups;
          G.tilesInPool = updatedTilesInPool;
          overrideNextUser = G.beginTileOwner;
          G.beginTileOwner = null;
        }

        if (overrideNextUser) {
          ctx.events.endTurn({ next: overrideNextUser });
        } else {
          ctx.events.endTurn();
        }
      }
    },
    pickTiles: {
      undoable: true,
      client: false,
      move: (G: GameState, ctx, tiles, tileGroupId, targetSlotId) => {
        // make sure user doesn't do two moves in a turn
        if (ctx.numMoves > 0) return;

        const isMiddleGroup = tileGroupId === "middle";
        const tileGroup = isMiddleGroup
          ? G.tileMiddleGroup
          : G.tileGroups[tileGroupId];

        const [selectedTiles, tilesForMiddle] = partition(
          tileGroup,
          ({ type }) => type === tiles[0].type
        );

        const playerBoard = G.players[ctx.currentPlayer];

        if (targetSlotId === "minus-points") {
          playerBoard.minusPoints.push(...selectedTiles);
        } else {
          const targetSlot = playerBoard.leftSlots[targetSlotId];

          let emptySlotCount = targetSlot.filter(s => s === null).length;

          // cannot place tiles of different color
          if (targetSlot[0] && targetSlot[0].type !== selectedTiles[0].type) {
            return INVALID_MOVE;
          }

          // cannot place it color is already filled
          const correspondingRightSlot = playerBoard.rightSlots[
            targetSlotId
          ].find(slot => slot.type === selectedTiles[0].type);
          if (!!correspondingRightSlot?.tile) {
            return INVALID_MOVE;
          }

          selectedTiles.forEach(tile => {
            if (emptySlotCount > 0) {
              targetSlot[targetSlot.indexOf(null)] = tile;
            } else {
              // add minus points
              playerBoard.minusPoints.push(tile);
            }

            emptySlotCount--;
          });
        }

        tileGroup.length = 0;
        G.tileMiddleGroup = tilesForMiddle.concat(G.tileMiddleGroup);

        // first person that takes from middle gets begin tile
        if (isMiddleGroup && !G.beginTileOwner) {
          playerBoard.minusPoints.push("begin-tile");
          G.beginTileOwner = ctx.currentPlayer;
        }
      }
    }
  }
};
