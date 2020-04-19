import React from "react";
import map from "lodash/map";
import { useBoardContext } from "./BoardContext";
import classNames from "classnames";

export const Scoreboard = () => {
  const { State, playerID, playersInfo, ctx } = useBoardContext();

  return (
    <div className="Scoreboard">
      {map(State.scoreboard, (userScore, userId) => {
        const playerInfo = playersInfo.find((p) => String(p.id) === userId)!;
        const isCurrentPlayer = ctx.currentPlayer === userId;

        return (
          <div key={userId} className="Scoreboard__row">
            <span
              style={{ marginRight: 20 }}
              className={classNames(
                "Scoreboard__player",
                isCurrentPlayer && "Scoreboard__player--active"
              )}
            >
              {playerInfo.name}
              {playerID === userId && " (You)"}:
            </span>
            <span>{userScore}</span>
          </div>
        );
      })}
    </div>
  );
};
