import { SocketIO } from "boardgame.io/multiplayer";
import { Client } from "boardgame.io/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isProduction } from "../../config";
import { SERVER_URL } from "../../config/client";
import { MosaicGame } from "../../game";
import { useStoreActions, useStoreState } from "../../store";
import { GameBoard } from "../GameBoard";
import { Trans } from "react-i18next";
import { LobbyPage, SmallLogo } from "components/LobbyPage";
import { Button } from "components/Button";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { ButtonLang } from "components/ButtonLang";

const GameClient = Client({
  game: MosaicGame,
  board: GameBoard,
  multiplayer: SocketIO({ server: SERVER_URL }),
});

export const GameLobby = () => {
  const [isGameRunning, setGameRunning] = useState(false);

  return isGameRunning ? (
    <GameLobbyPlay />
  ) : (
    <GameLobbySetup startGame={() => setGameRunning(true)} />
  );
};

export const GameLobbySetup: React.FC<{ startGame(): void }> = ({
  startGame,
}) => {
  const { id } = useParams();
  const nickname = useStoreState((s) => s.nickname);
  const roomMetadata = useStoreState((s) => s.roomMetadata);
  const loadRoomMetadata = useStoreActions((s) => s.loadRoomMetadata);
  const joinRoom = useStoreActions((s) => s.joinRoom);
  const activeRoomPlayer = useStoreState((s) => s.activeRoomPlayer);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const supportsCopying = !!document.queryCommandSupported("copy");
  function copyToClipboard(value: string) {
    var textField = document.createElement("textarea");
    textField.innerText = value;
    textField.style.opacity = "0";
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }

  const gameRoomFull =
    roomMetadata?.players.filter((p) => !p.name).length === 0;

  // Check if current user has already joined this room
  const alreadyJoined = roomMetadata?.players.find((p) => {
    return p.id === activeRoomPlayer?.playerID && p.name === nickname;
  });

  // Find first empty seat ID
  const emptySeatID = roomMetadata?.players.find((p) => !p.name)?.id;
  const canJoin = !alreadyJoined && emptySeatID !== undefined && nickname && id;

  const handleJoinRoom = () => {
    if (canJoin) {
      joinRoom({ playerID: emptySeatID, playerName: nickname, roomID: id });
    }
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (id) loadRoomMetadata(id);
    }, 500);

    return () => clearInterval(intervalID);
  }, [loadRoomMetadata, id]);

  useEffect(() => {
    if (gameRoomFull) {
      setTimeout(() => startGame(), 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameRoomFull]);

  return (
    <LobbyPage>
      <SmallLogo />
      <ButtonLang />

      <div className="text-[2.625em] text-white font-medium m-0">
        {roomMetadata?.setupData?.roomName || id}
      </div>
      {roomMetadata?.setupData?.roomName && (
        <div className="text-[1.125em] text-white/80 mt-[.5em] text-center">
          <Trans>Room ID: {id}</Trans>
        </div>
      )}

      {/* Always show invite section */}
      <div className="text-[1.5em] text-white mt-[1.5em] text-center">
        <Trans>Invite Players</Trans>
      </div>
      <div className="text-[1.125em] text-white mt-[.5em] text-center">
        <Trans>Send a link to your friends to invite them to your game</Trans>
      </div>
      <div className="flex my-[1.5em] justify-center">
        <div className="pill-box">{window.location.href}</div>
        {supportsCopying && (
          <Tippy
            visible={tooltipVisible}
            offset={[0, 12]}
            content={<Trans>Copied!</Trans>}
          >
            <div className="ml-[1.25em]">
              <Button
                onClick={() => {
                  copyToClipboard(window.location.href);
                  setTooltipVisible(true);
                  setTimeout(() => setTooltipVisible(false), 1500);
                }}
              >
                <Trans>Copy</Trans>
              </Button>
            </div>
          </Tippy>
        )}
      </div>

      {/* Always show player list */}
      <div className="text-center flex flex-col items-center text-white font-medium text-[1.125em] my-[1.5em]">
        {roomMetadata ? (
          roomMetadata.players?.map((player) => {
            return player.name ? (
              <div
                key={player.id}
                className="my-[.75em] font-medium after:block after:content-[''] after:w-full after:h-[.3125em] after:mt-[.375em] after:rounded-[.625em] after:bg-green"
              >
                {player.name} {player.name === nickname && "(You)"}
              </div>
            ) : (
              <div
                key={player.id}
                className="my-[.75em] font-medium flex items-center justify-center gap-[1em]"
              >
                <div className="after:block after:content-[''] after:w-full after:h-[.3125em] after:mt-[.375em] after:rounded-[.625em] after:bg-yellow">
                  <Trans>Empty slot</Trans>
                </div>
                {!alreadyJoined && canJoin && (
                  <Button size="small" onClick={() => handleJoinRoom()}>
                    <Trans>Join</Trans>
                  </Button>
                )}
              </div>
            );
          })
        ) : (
          <Trans>Loading...</Trans>
        )}
      </div>

      {/* Show message if user can't join */}
      {!alreadyJoined && !canJoin && (
        <div className="text-center mb-[1.5em]">
          {!nickname ? (
            <div className="text-white text-[1.25em] font-medium">
              <Trans>Please set a nickname first</Trans>
            </div>
          ) : !emptySeatID ? (
            <div className="text-white text-[1.25em] font-medium">
              <Trans>Room is full</Trans>
            </div>
          ) : (
            <div className="text-white text-[1.25em] font-medium">
              <Trans>Unable to join room</Trans>
            </div>
          )}
        </div>
      )}

      {/* Game status */}
      <div className="text-white text-[1.25em] font-medium leading-[1.3] text-center">
        {gameRoomFull ? (
          <Trans>Starting Game...</Trans>
        ) : alreadyJoined ? (
          <Trans>Game will start when all players join!</Trans>
        ) : (
          <Trans>Click "Join Game" to take a spot in this room</Trans>
        )}
      </div>
    </LobbyPage>
  );
};

export const GameLobbyPlay = () => {
  const { id } = useParams();
  const activeRoomPlayer = useStoreState((s) => s.activeRoomPlayer);

  return (
    <GameClient
      gameID={id}
      playerID={String(activeRoomPlayer?.playerID)}
      credentials={activeRoomPlayer?.credential}
      debug={!isProduction}
    />
  );
};

export const GameLobbySpectator = () => {
  const { id } = useParams();

  return <GameClient gameID={id} />;
};
