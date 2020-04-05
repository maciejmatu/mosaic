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

const GameClient = Client({
  game: MosaicGame,
  board: GameBoard,
  multiplayer: SocketIO({ server: SERVER_URL })
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
  startGame
}) => {
  const { id } = useParams();
  const nickname = useStoreState(s => s.nickname);
  const roomMetadata = useStoreState(s => s.roomMetadata);
  const loadRoomMetadata = useStoreActions(s => s.loadRoomMetadata);
  const joinRoom = useStoreActions(s => s.joinRoom);
  const activeRoomPlayer = useStoreState(s => s.activeRoomPlayer);

  const gameRoomFull = roomMetadata?.players.filter(p => !p.name).length === 0;

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (id) loadRoomMetadata(id);
    }, 500);

    return () => clearInterval(intervalID);
  }, [loadRoomMetadata, id]);

  useEffect(() => {
    if (gameRoomFull) {
      setTimeout(() => startGame(), 1000);
    }
  }, [gameRoomFull]);

  useEffect(() => {
    // find first empty seat ID
    const emptySeatID = roomMetadata?.players.find(p => !p.name)?.id;
    const alreadyJoined = roomMetadata?.players.find(p => {
      return p.id === activeRoomPlayer?.playerID && p.name === nickname;
    });

    if (!alreadyJoined && emptySeatID !== undefined && nickname && id) {
      joinRoom({ playerID: emptySeatID, playerName: nickname, roomID: id });
    }
  }, [roomMetadata]);

  return (
    <div className="Lobby__page">
      <div className="Lobby__title">Invite Players</div>
      <div className="Lobby__subtitle">
        Send a link to your friends to invite them to your game
      </div>
      <div className="Lobby__link">{window.location.href}</div>

      <div className="Lobby__players">
        {roomMetadata
          ? roomMetadata.players?.map(player => {
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
                  Waiting for player...
                </div>
              );
            })
          : "Loading..."}
      </div>
      {gameRoomFull ? (
        <span>Starting Game...</span>
      ) : (
        <span>Game will start when all players join!</span>
      )}
    </div>
  );
};

export const GameLobbyPlay = () => {
  const { id } = useParams();
  const activeRoomPlayer = useStoreState(s => s.activeRoomPlayer);

  return (
    <GameClient
      gameID={id}
      playerID={String(activeRoomPlayer?.playerID)}
      credentials={activeRoomPlayer?.credential}
      debug={!isProduction}
    />
  );
};
