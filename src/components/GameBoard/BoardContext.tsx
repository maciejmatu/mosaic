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
  chatMessages?: { id: string; sender: string; payload: any }[];
  sendChatMessage?: (payload: any) => void;
  pickTiles(
    tileIds: GameTile[],
    tileGroupId: number | "middle",
    targetSlotId: number | "minus-points"
  ): void;
  selectedTiles?: SelectedTiles;
  setSelectedTiles(tiles: SelectedTiles): void;
  isSidebarPinned: boolean;
  setSidebarPinned(value: boolean): void;
  playersInfo: { id: string; name: string }[];
}

export const BoardContext = createContext({} as IBoardContext);

export const useBoardContext = () => {
  return useContext(BoardContext);
};
