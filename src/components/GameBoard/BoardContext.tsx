import { useContext } from "react";
import { createContext } from "react";
import { GameState, GameTile } from "../../game";
import { SelectedTiles } from ".";

interface IBoardContext {
  playerID: string;
  moves: any;
  State: GameState;
  isActive: boolean;
  ctx: any;
  undo(): void;
  pickTiles(
    tileIds: GameTile[],
    tileGroupId: number | "middle",
    targetSlotId: number | "minus-points"
  ): void;
  selectedTiles?: SelectedTiles;
  setSelectedTiles(tiles: SelectedTiles): void;
  playersInfo: { id: string; name: string }[];
}

export const BoardContext = createContext({} as IBoardContext);

export const useBoardContext = () => {
  return useContext(BoardContext);
};
