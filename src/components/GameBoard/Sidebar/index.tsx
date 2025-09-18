import Lock from "assets/svg/lock.svg?react";
import Unlock from "assets/svg/unlock.svg?react";
import classNames from "classnames";
import { Logo } from "components/Logo";

import { Trans, useTranslation } from "react-i18next";
import { useBoardContext } from "../BoardContext";
import { PlayerBoardLayout } from "../PlayerBoard";
import { Scoreboard } from "../Scoreboard";

export const Sidebar = () => {
  const {
    State,
    playerID,
    playersInfo,
    ctx,
    isSidebarPinned,
    setSidebarPinned,
  } = useBoardContext();
  const { t } = useTranslation();
  const otherPlayers = (playersInfo || []).filter(
    (p) => String(p.id) !== playerID
  );
  const userScore = State?.scoreboard?.[playerID] ?? 0;

  return (
    <div
      data-show-text={t("show")}
      className={classNames(
        "absolute left-0 bg-violet z-[1] h-full py-[1.5em] pr-[3.125em] pl-[1em] flex items-center overflow-auto flex-col shadow-[.25em_0_0_rgba(0,0,0,0.14)]",
        isSidebarPinned
          ? "translate-x-0 rounded-none"
          : "translate-x-[calc(-100%+3.125em)] rounded-r-[1.25em] hover:translate-x-0 transition-transform duration-200 ease-linear"
      )}
    >
      <Logo size="small" className="mb-[1.25em] shrink-0" />

      <div
        className="cursor-pointer absolute right-[2.5em] p-[.625em] top-[.625em] hover:opacity-70"
        onClick={() => setSidebarPinned(!isSidebarPinned)}
      >
        {isSidebarPinned ? (
          <Lock className="w-[1.875em] text-white" />
        ) : (
          <Unlock className="w-[1.875em] text-white" />
        )}
      </div>

      <div className="my-[.625em] mb-[1em] text-[1.5em] text-white font-bold w-full">
        <Trans>
          You have <span className="text-ocean-green">{{ userScore }}</span> pts
        </Trans>
      </div>

      {(otherPlayers || []).map((player) => {
        const playerBoard = State.players?.[String(player.id)];
        const playerID = String(player.id);
        const isCurrentPlayer = ctx.currentPlayer === playerID;
        const score = State?.scoreboard?.[playerID] ?? 0;

        return (
          <PlayerBoardLayout
            key={player.id}
            className={classNames(
              "text-[.625em] my-[1.875em] mx-[.25em] ml-[3.125em] shrink-0",
              isCurrentPlayer && "shadow-[0_0_0_.1875em_rgba(17,199,89,0.6)]"
            )}
            minimal
            playerBoard={playerBoard}
          >
            <span className="font-bold text-white text-[1em] -top-[.375em] -translate-y-full absolute">
              {player.name}
            </span>
            <span className="font-bold text-ocean-green right-0 text-[1em] -top-[.375em] -translate-y-full absolute">
              <Trans count={score}>{{ score }} pts</Trans>
            </span>
          </PlayerBoardLayout>
        );
      })}
      <div className="mt-auto w-full pr-[.5em]">
        <Scoreboard />
      </div>
    </div>
  );
};
