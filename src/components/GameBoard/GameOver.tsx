import { ButtonLink } from "components/Button";
import sortBy from "lodash/sortBy";
import React from "react";
import { Trans } from "react-i18next";
import { useBoardContext } from "./BoardContext";

export const GameOver = () => {
  const { State, playerID, playersInfo } = useBoardContext();

  const sortedWinners = sortBy(
    playersInfo.map((player) => ({
      ...player,
      score: State.scoreboard[player.id],
    })),
    "score"
  ).reverse();

  const placeMessages = {
    0: <Trans>You Won!</Trans>,
    1: <Trans>You are 2nd. Good Job!</Trans>,
    2: <Trans>You are 3rd. Better luck next time!</Trans>,
    3: <Trans>You are 4th. Better luck next time!</Trans>,
  };

  const place = sortedWinners.findIndex((user) => String(user.id) === playerID);

  return (
    <div className="GameOver">
      <div className="GameOver__modal">
        <h2 className="GameOver__title">
          <Trans>Game Results</Trans>
        </h2>

        <h2 className="GameOver__subtitle">{placeMessages[place]}</h2>

        <div className="GameOver__ranking">
          {sortedWinners.map((player, i) => {
            const isCurrentPlayer = playerID === String(player.id);

            return (
              <div className="GameOver__ranking-result" key={player.id}>
                <span>{i + 1}.</span>
                <span>
                  {player.name}
                  {isCurrentPlayer && " (You)"}
                </span>
                <span>{player.score}</span>
              </div>
            );
          })}
        </div>

        <ButtonLink to="/create">
          <Trans>Create new game</Trans>
        </ButtonLink>
      </div>
    </div>
  );
};
