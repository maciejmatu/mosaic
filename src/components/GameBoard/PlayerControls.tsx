import React from "react";
import { useBoardContext } from "./BoardContext";
import { Trans } from "react-i18next";

export const PlayerControls = () => {
  const { isActive, playerID, moves, ctx, undo } = useBoardContext();

  return (
    <div className="PlayerControls">
      <button
        disabled={!ctx.numMoves}
        className="Button Button--undo"
        onClick={() => undo()}
      >
        <Trans>Undo</Trans>
      </button>

      <button
        className="Button Button--confirm"
        key={playerID}
        onClick={() => {
          moves.endTurn();
        }}
        disabled={!ctx.numMoves || !isActive}
      >
        <Trans>End Turn</Trans>
      </button>
    </div>
  );
};
