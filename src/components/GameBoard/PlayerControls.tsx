import React from "react";
import { useBoardContext } from "./BoardContext";
import { Trans } from "react-i18next";
import { Button } from "components/Button";

export const PlayerControls = () => {
  const { isActive, moves, ctx, undo } = useBoardContext();

  return (
    <div className="PlayerControls">
      <Button
        theme="yellow"
        size="small"
        className="PlayerControls__button"
        disabled={!ctx.numMoves || !isActive}
        onClick={() => undo()}
      >
        <Trans>Undo</Trans>
      </Button>

      <Button
        theme="green"
        onClick={() => moves.endTurn()}
        className="PlayerControls__button"
        size="small"
        disabled={!ctx.numMoves || !isActive}
      >
        <Trans>End Turn</Trans>
      </Button>
    </div>
  );
};
