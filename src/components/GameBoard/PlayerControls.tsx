import React from "react";
import { useBoardContext } from "./BoardContext";

export const PlayerControls = () => {
  const { isActive, playerID, moves, ctx, undo } = useBoardContext();

  return (
    <div className="PlayerControls">
      <button
        className="Button Button--confirm"
        key={playerID}
        onClick={() => {
          moves.endTurn();
        }}
        disabled={!ctx.numMoves && !isActive}
      >
        End Turn
      </button>
      <button className="Button Button--undo" onClick={() => undo()}>
        Undo
      </button>
    </div>
  );
};
