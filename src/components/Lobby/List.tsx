import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../../store";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import { LobbyPage, SmallLogo } from "components/LobbyPage";
import { Trans } from "react-i18next";

export const LobbyList: React.FC = () => {
  const rooms = useStoreState((s) => s.rooms);
  const loadRooms = useStoreActions((s) => s.loadRooms);
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);

  useEffect(() => {
    loadRooms();
    const interval = setInterval(() => loadRooms(), 3000);
    return () => clearInterval(interval);
  }, [loadRooms]);

  return (
    <LobbyPage>
      <SmallLogo />
      <div className="text-[2em] text-white font-medium m-0 mb-[.5em]">
        <Trans>Available Games</Trans>
      </div>

      <div className="mb-[1em] flex items-center gap-[.5em]">
        <span className="text-white/80 text-[.95em]">
          <Trans>Room size:</Trans>
        </span>
        <button
          className={`px-[.75em] py-[.375em] rounded-[.5em] text-white text-[.95em] ${
            capacityFilter === null
              ? "bg-green"
              : "bg-[rgba(178,100,210,0.35)] hover:bg-[rgba(178,100,210,0.5)]"
          }`}
          onClick={() => setCapacityFilter(null)}
        >
          <Trans>All</Trans>
        </button>
        {[2, 3, 4].map((n) => (
          <button
            key={n}
            className={`px-[.75em] py-[.375em] rounded-[.5em] text-white text-[.95em] ${
              capacityFilter === n
                ? "bg-green"
                : "bg-[rgba(178,100,210,0.35)] hover:bg-[rgba(178,100,210,0.5)]"
            }`}
            onClick={() => setCapacityFilter(capacityFilter === n ? null : n)}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[40em] bg-[rgba(178,100,210,0.35)] rounded-[.625em] p-[1em] text-white h-[27em] overflow-y-auto">
        {rooms.length === 0 ? (
          <div className="opacity-70">
            <Trans>No games available</Trans>
          </div>
        ) : (
          rooms
            .slice()
            .sort((a: any, b: any) => {
              const aCreated = a.createdAt ?? a.updatedAt;
              const bCreated = b.createdAt ?? b.updatedAt;
              const aTime =
                typeof aCreated === "number"
                  ? aCreated
                  : Date.parse(aCreated || "0");
              const bTime =
                typeof bCreated === "number"
                  ? bCreated
                  : Date.parse(bCreated || "0");
              return bTime - aTime; // newest first
            })
            .filter((room) =>
              capacityFilter !== null
                ? (room.players || []).length === capacityFilter
                : true
            )
            .map((room) => {
              const players = room.players || [];
              const taken = players.filter((p) => !!p.name).length;
              const capacity = players.length || 0;
              const createdRaw: any = room.createdAt ?? room.updatedAt;
              const created =
                typeof createdRaw === "number"
                  ? new Date(createdRaw)
                  : new Date(createdRaw || 0);
              return (
                <div
                  key={room.matchID}
                  className="flex items-center justify-between py-[.5em] border-b border-white/20 last:border-b-0"
                >
                  <div>
                    <div className="font-semibold">
                      {room.setupData?.roomName || room.matchID}
                    </div>
                    <div className="opacity-80 text-[.9em]">
                      {taken}/{capacity} <Trans>players</Trans>
                    </div>
                    <div className="opacity-60 text-[.8em]">
                      <Trans>Created</Trans>: {created.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-[.5em]">
                    <Link to={`/rooms/${room.matchID}`}>
                      <Button size="small">
                        <Trans>Open</Trans>
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })
        )}
      </div>
      <div className="mt-[1em]">
        <Link to="/create">
          <Button>
            <Trans>Create New Game</Trans>
          </Button>
        </Link>
      </div>
    </LobbyPage>
  );
};
