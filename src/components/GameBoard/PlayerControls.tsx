import { useBoardContext } from "./BoardContext";
import { Trans } from "react-i18next";
import { Button } from "components/Button";
import { useStoreActions } from "../../store";

export const PlayerControls = () => {
  const { isActive, moves, ctx, undo } = useBoardContext();
  const canUndo = !!isActive && (ctx?.numMoves ?? 0) > 0;
  const setShowRulebook = useStoreActions((s) => s.setShowRulebook);

  return (
    <div className="PlayerControls">
      <Button
        theme="pink"
        size="small"
        className="PlayerControls__button"
        onClick={() => {
          gtag("event", "rulebook");
          setShowRulebook(true);
        }}
      >
        <Trans>Rulebook</Trans>
      </Button>

      <Button
        theme="yellow"
        size="small"
        className="PlayerControls__button"
        disabled={!canUndo}
        onClick={() => {
          if (!canUndo) return;
          gtag("event", "undo");
          try {
            undo();
          } catch (e) {
            // Ignore when there is nothing to undo
          }
        }}
      >
        <Trans>Undo</Trans>
      </Button>

      <Button
        theme="green"
        onClick={() => {
          gtag("event", "end-turn");
          moves.endTurn();
        }}
        className="PlayerControls__button"
        size="small"
        disabled={!ctx.numMoves || !isActive}
      >
        <Trans>End Turn</Trans>
      </Button>
    </div>
  );
};
