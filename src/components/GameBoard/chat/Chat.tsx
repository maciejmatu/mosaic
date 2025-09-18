import React, { useMemo, useRef, useState, useEffect } from "react";
import { useBoardContext } from "../BoardContext";
import { Input } from "components/Input";
import { Button } from "components/Button";

export const Chat: React.FC = () => {
  const {
    chatMessages = [],
    sendChatMessage,
    playerID,
    playersInfo,
  } = useBoardContext();
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const canSend = !!sendChatMessage && text.trim().length > 0;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const messages = useMemo(() => {
    return (chatMessages || []).map((m) => {
      const player = (playersInfo || []).find(
        (p) => String(p.id) === String(m.sender)
      );
      const name = player?.name ?? m.sender;
      return {
        id: m.id,
        sender: m.sender,
        name,
        payload:
          typeof m.payload === "string" ? m.payload : JSON.stringify(m.payload),
      };
    });
  }, [chatMessages, playersInfo]);

  const onSend = () => {
    if (!canSend) return;
    sendChatMessage?.(text.trim());
    setText("");
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="absolute bottom-0 right-0 w-[18em] translate-x-full flex flex-col pl-3">
      <div className="bg-[rgba(178,100,210,0.8)] text-white p-2 rounded-lg shadow-md flex flex-col h-[18em] md:h-[22em]">
        <div ref={listRef} className="flex-1 p-[.75em] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="opacity-70 text-[.9em]">No messages yet</div>
          ) : (
            messages.map((m) => {
              const isSelf = String(m.sender) === String(playerID);
              return (
                <div key={m.id} className="mb-[.375em] last:mb-0">
                  <span
                    className={
                      isSelf ? "text-ocean-green" : "text-light-yellow"
                    }
                  >
                    {isSelf ? "You" : m.name}
                  </span>
                  <span className="opacity-70">: </span>
                  <span>{m.payload}</span>
                </div>
              );
            })
          )}
        </div>
        <div className="flex items-center gap-[.5em] w-full">
          <input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            className="h-full block text-left text-black outline-0 border-0 px-2 py-[.375em] rounded-[.375em] bg-[rgba(255,255,255,0.9)] placeholder-black/50 flex-1"
          />
          <Button
            size="small"
            theme="blue"
            disabled={!canSend}
            className="shrink-0 w-5"
            onClick={onSend}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
