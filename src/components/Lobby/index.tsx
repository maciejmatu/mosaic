import { SocketIO } from "boardgame.io/multiplayer";
import { Client } from "boardgame.io/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isProduction } from "../../config";
import { SERVER_URL } from "../../config/client";
import { MosaicGame } from "../../game";
import { useStoreActions, useStoreState } from "../../store";
import { GameBoard } from "../GameBoard";
import "./style.scss";
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

  useEffect(() => {
    // find first empty seat ID
    const emptySeatID = roomMetadata?.players.find((p) => !p.name)?.id;
    const alreadyJoined = roomMetadata?.players.find((p) => {
      return p.id === activeRoomPlayer?.playerID && p.name === nickname;
    });

    if (!alreadyJoined && emptySeatID !== undefined && nickname && id) {
      joinRoom({ playerID: emptySeatID, playerName: nickname, roomID: id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomMetadata]);

  return (
    <LobbyPage>
      <SmallLogo />
      <ButtonLang />

      <div className="Lobby__title">
        <Trans>Invite Players</Trans>
      </div>
      <div className="Lobby__subtitle">
        <Trans>Send a link to your friends to invite them to your game</Trans>
      </div>
      <div className="Lobby__link">
        <div className="Lobby__link-box">{window.location.href}</div>
        {supportsCopying && (
          <Tippy
            visible={tooltipVisible}
            offset={[0, 12]}
            content={<Trans>Copied!</Trans>}
          >
            <div className="Lobby__link-button">
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

      <div className="Lobby__players">
        {roomMetadata ? (
          roomMetadata.players?.map((player) => {
            return player.name ? (
              <div
                key={player.id}
                className="Lobby__player Lobby__player--active"
              >
                {player.name} {player.name === nickname && "(You)"}
              </div>
            ) : (
              <div
                key={player.id}
                className="Lobby__player Lobby__player--inactive"
              >
                <Trans>Waiting for player...</Trans>
              </div>
            );
          })
        ) : (
          <Trans>Loading...</Trans>
        )}
      </div>
      <div className="Lobby__status-message">
        {gameRoomFull ? (
          <Trans>Starting Game...</Trans>
        ) : (
          <Trans>Game will start when all players join!</Trans>
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
