import map from "lodash/map";
import { useBoardContext } from "./BoardContext";
import classNames from "classnames";

export const Scoreboard = () => {
  const { State, playerID, playersInfo, ctx } = useBoardContext();

  return (
    <div className="p-[1em] rounded-[.625em] bg-[rgba(178,100,210,0.35)] text-[1em] text-white font-medium leading-[1.4] w-full">
      {map(State?.scoreboard || {}, (userScore, userId) => {
        const playerInfo = (playersInfo || []).find(
          (p) => String(p.id) === userId
        );
        const isCurrentPlayer = ctx.currentPlayer === userId;

        return (
          <div
            key={userId}
            className="min-w-[6.25em] flex my-[.3125em] justify-between"
          >
            <span
              style={{ marginRight: 20 }}
              className={classNames(
                "relative pl-[1.25em]",
                isCurrentPlayer &&
                  "text-ocean-green before:content-['➤'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:text-[.875em]"
              )}
            >
              {playerInfo?.name ?? "Player"}
              {playerID === userId && " (You)"}:
            </span>
            <span>{userScore}</span>
          </div>
        );
      })}
    </div>
  );
};
