import { BoardProps } from "boardgame.io/react";
import React, { useState } from "react";
import { GameState, GameTile, GameTileType } from "../../game";
import { BoardContext } from "./BoardContext";
import { PlayerBoard } from "./PlayerBoard";
import { Scoreboard } from "./Scoreboard";
import { TilesBoard } from "./TilesBoard";
import "./style.scss";
import { GameOver } from "./GameOver";

export interface SelectedTiles {
  tiles: GameTile[];
  groupId: number | "middle";
}

export const tileColorModifier: { [key in GameTileType]: string } = {
  [GameTileType.A]: "type-a",
  [GameTileType.B]: "type-b",
  [GameTileType.C]: "type-c",
  [GameTileType.D]: "type-d",
  [GameTileType.E]: "type-e",
  [GameTileType.BEGIN]: "type-begin",
};

export const GameBoard: React.FC<BoardProps<GameState>> = ({
  G: State,
  moves,
  isActive,
  ctx,
  playerID,
  undo,
  gameMetadata,
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
        setSelectedTiles,
        playersInfo: gameMetadata,
      }}
    >
      <div className="GameBoard">
        {!!ctx.gameover && <GameOver />}
        <Scoreboard />
        <TilesBoard />
        <PlayerBoard />
      </div>
    </BoardContext.Provider>
  );
};
