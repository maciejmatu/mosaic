import React from "react";
import { useBoardContext } from "./BoardContext";

export const PlayerControls = () => {
  const { playerID, moves, ctx, undo } = useBoardContext();

  return (
    <div>
      <button
        className="Button"
        key={playerID}
        onClick={() => {
          moves.endTurn();
        }}
        disabled={!ctx.numMoves}
      >
        End Turn
      </button>
      <button className="Button" onClick={() => undo()}>
        Undo
      </button>
    </div>
  );
};
