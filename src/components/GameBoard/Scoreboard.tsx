import React from "react";
import map from "lodash/map";
import { useBoardContext } from "./BoardContext";

export const Scoreboard = () => {
  const { State } = useBoardContext();

  return (
    <div className="Scoreboard">
      {map(State.scoreboard, (userScore, userId) => {
        return (
          <span key={userId}>
            User {userId}: {userScore} |
          </span>
        );
      })}
    </div>
  );
};
