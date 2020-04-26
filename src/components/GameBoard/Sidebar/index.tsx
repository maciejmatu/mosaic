import { ReactComponent as Lock } from "assets/svg/lock.svg";
import { ReactComponent as Unlock } from "assets/svg/unlock.svg";
import classNames from "classnames";
import { Logo } from "components/Logo";
import React from "react";
import { Trans } from "react-i18next";
import { useBoardContext } from "../BoardContext";
import { PlayerBoardLayout } from "../PlayerBoard";
import style from "./style.module.scss";

export const Sidebar = () => {
  const {
    State,
    playerID,
    playersInfo,
    ctx,
    isSidebarPinned,
    setSidebarPinned,
  } = useBoardContext();
  const otherPlayers = playersInfo.filter((p) => String(p.id) !== playerID);
  const userScore = State.scoreboard[playerID];

  return (
    <div
      className={classNames(style.sidebar, {
        [style.sidebarPinned]: isSidebarPinned,
      })}
    >
      <Logo size="small" className={style.sidebarLogo} />

      <div
        className={style.lockToggle}
        onClick={() => setSidebarPinned(!isSidebarPinned)}
      >
        {isSidebarPinned ? (
          <Lock className={style.sidebarLock} />
        ) : (
          <Unlock className={style.sidebarLock} />
        )}
      </div>

      <div className={style.userScore}>
        <Trans>
          You have <span className={style.scoreValue}>{{ userScore }}</span> pts
        </Trans>
      </div>

      {otherPlayers.map((player) => {
        const playerBoard = State.players[String(player.id)];
        const playerID = String(player.id);
        const isCurrentPlayer = ctx.currentPlayer === playerID;
        const score = State.scoreboard[playerID];

        return (
          <PlayerBoardLayout
            key={player.id}
            className={classNames(
              style.sidebarBoard,
              isCurrentPlayer && style.activeBoard
            )}
            minimal
            playerBoard={playerBoard}
          >
            <span className={style.playerName}>{player.name}</span>
            <span className={style.playerScore}>
              <Trans count={score}>{{ score }} pts</Trans>
            </span>
          </PlayerBoardLayout>
        );
      })}
    </div>
  );
};
