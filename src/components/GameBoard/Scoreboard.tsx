import React from "react";
import map from "lodash/map";
import { useBoardContext } from "./BoardContext";

export const Scoreboard = () => {
  const { State, playerID, playersInfo } = useBoardContext();

  return (
    <div className="Scoreboard">
      {map(State.scoreboard, (userScore, userId) => {
        const playerInfo = playersInfo.find(p => String(p.id) === userId)!;

        return (
          <div key={userId} className="Scoreboard__row">
            <span style={{ marginRight: 20 }}>
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
