import { BoardProps } from "boardgame.io/react";
import React, { useState, useEffect } from "react";
import { GameState, GameTile, GameTileType } from "../../game";
import { BoardContext } from "./BoardContext";
import { PlayerBoard } from "./PlayerBoard";
import { Scoreboard } from "./Scoreboard";
import { TilesBoard } from "./TilesBoard";
import { useTranslation } from "react-i18next";
import { GameOver } from "./GameOver";
import { Sidebar } from "./Sidebar";
import "./style.scss";
import classNames from "classnames";

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
  const [isSidebarPinned, setSidebarPinned] = useState(false);
  const { t } = useTranslation();

  const pickTiles = (
    tileIds: GameTile[],
    tileGroupId: number | "middle",
    targetSlotId: number | "minus-points"
  ) => {
    if (!isActive) return;

    moves.pickTiles(tileIds, tileGroupId, targetSlotId);
    setSelectedTiles(undefined);
  };

  useEffect(() => {
    if (!isActive) return;

    const originalTitle = document.title;

    const interval = setInterval(() => {
      document.title =
        document.title === originalTitle
          ? `▼ ${t("Make a move")} ▼`
          : originalTitle;
    }, 1500);

    return () => {
      clearInterval(interval);
      document.title = originalTitle;
    };
  }, [t, isActive]);

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
        isSidebarPinned,
        setSidebarPinned,
        playersInfo: gameMetadata,
      }}
    >
      <div
        className={classNames(
          "GameBoard",
          isSidebarPinned && "GameBoard--pinned"
        )}
      >
        <Sidebar />
        {!!ctx.gameover && <GameOver />}
        <Scoreboard />
        <TilesBoard />
        <PlayerBoard />
      </div>
    </BoardContext.Provider>
  );
};
