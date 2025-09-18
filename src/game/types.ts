export type PlayerID = string;

export enum GameTileType {
  A = "tile-a",
  B = "tile-b",
  C = "tile-c",
  D = "tile-d",
  E = "tile-e",
  BEGIN = "tile-begin",
}

export interface GameTile {
  type: GameTileType; // e.g. in UI shows different color
  id: string;
}

export interface GameTile {
  type: GameTileType; // e.g. in UI shows different color
  id: string;
}

export interface PermanentSlot {
  type: GameTileType;
  tile?: GameTile;
  rowIndex: number;
  colIndex: number;
  filled?: boolean;
}

export interface Player {
  id: PlayerID;
  leftSlots: (GameTile | null)[][];
  rightSlots: PermanentSlot[][];
  minusPoints: (GameTile | "begin-tile")[];
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
