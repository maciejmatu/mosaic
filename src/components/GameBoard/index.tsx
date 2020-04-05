import { BoardProps } from "boardgame.io/react";
import React, { useState } from "react";
import { GameState, GameTile, GameTileType } from "../../game";
import "../../styles/board.scss";
import { BoardContext } from "./BoardContext";
import { PlayerBoard } from "./PlayerBoard";
import { PlayerControls } from "./PlayerControls";
import { Scoreboard } from "./Scoreboard";
import { TilesBoard } from "./TilesBoard";

export interface SelectedTiles {
  tiles: GameTile[];
  groupId: number | "middle";
}

export const tileColorModifier: { [key in GameTileType]: string } = {
  [GameTileType.A]: "type-a",
  [GameTileType.B]: "type-b",
  [GameTileType.C]: "type-c",
  [GameTileType.D]: "type-d",
  [GameTileType.E]: "type-e"
};

export const GameBoard: React.FC<BoardProps<GameState>> = ({
  G: State,
  moves,
  isActive,
  ctx,
  playerID,
  undo
}) => {
  const [selectedTiles, setSelectedTiles] = useState<SelectedTiles | undefined>(
    undefined
  );

  const pickTiles = (
    tileIds: GameTile[],
    tileGroupId: number | "middle",
    targetSlotId: number | "minus-points"
  ) => {
    if (!isActive) return;

    moves.pickTiles(tileIds, tileGroupId, targetSlotId);
    setSelectedTiles(undefined);
  };

  return (
    <BoardContext.Provider
      value={{
        playerID,
        moves,
        State,
        isActive,
        ctx,
        undo,
        pickTiles,
        selectedTiles,
        setSelectedTiles
      }}
    >
      <PlayerControls />
      <Scoreboard />
      <TilesBoard />
      <PlayerBoard />
    </BoardContext.Provider>
  );
};
