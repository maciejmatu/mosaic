import classNames from "classnames";
import { Logo } from "components/Logo";
import React from "react";
import { useBoardContext } from "../BoardContext";
import { PlayerBoardLayout } from "../PlayerBoard";
import style from "./style.module.scss";
import { Trans } from "react-i18next";

export const Sidebar = () => {
  const { State, playerID, playersInfo, ctx } = useBoardContext();
  const otherPlayers = playersInfo.filter((p) => String(p.id) !== playerID);
  const userScore = State.scoreboard[playerID];

  return (
    <div className={style.sidebar}>
      <Logo size="small" className={style.sidebarLogo} />

      <div className={style.userScore}>
        <Trans>
          You have <span className={style.scoreValue}>{{ userScore }}</span> pts
        </Trans>
      </div>

      {otherPlayers.map((player) => {
        console.log(player);
        const playerBoard = State.players[String(player.id)];
        const playerID = String(player.id);
        const isCurrentPlayer = ctx.currentPlayer === playerID;
        const score = State.scoreboard[playerID];

        return (
          <>
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
          </>
        );
      })}
    </div>
  );
};
