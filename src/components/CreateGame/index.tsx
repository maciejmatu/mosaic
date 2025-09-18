import { Navigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store";
import { ButtonChangeNickname } from "../ButtonChangeNickname";
import { Trans } from "react-i18next";
import { ButtonLang } from "components/ButtonLang";
import { Button, ButtonProps } from "components/Button";
import { LobbyPage, SmallLogo } from "components/LobbyPage";
import { Input } from "components/Input";
import { useState } from "react";

interface Props {
  playerCount: number;
  roomName: string;
  onClick(playerCount: number, roomName: string): void;
}

const CreateGameButton: React.FC<ButtonProps & Props> = ({
  playerCount,
  roomName,
  onClick,
  ...props
}) => {
  return (
    <Button
      className="CreateGameButton w-[7.5em] h-[7.5em] m-[1.5em]"
      onClick={() => onClick(playerCount, roomName)}
      {...props}
    >
      <span className="CreateGameButton__count text-[2em]">{playerCount}</span>
      <Trans>Players</Trans>
    </Button>
  );
};

export const CreateGame: React.FC = () => {
  const createGameRoom = useStoreActions((s) => s.createGameRoom);
  const nickname = useStoreState((s) => s.nickname);
  const roomID = useStoreState((s) => s.roomID);
  const [roomName, setRoomName] = useState("");

  if (roomID) return <Navigate to={`/rooms/${roomID}`} replace />;

  const handleCreateRoom = (playerCount: number, roomName: string) => {
    createGameRoom({
      numPlayers: playerCount,
      roomName: roomName.trim() || undefined,
    });
  };

  return (
    <LobbyPage>
      <SmallLogo />
      <ButtonChangeNickname />
      <ButtonLang />

      <h3 className="page-title">
        <Trans>Welcome {{ nickname }}!</Trans>
      </h3>
      <h3 className="page-subtitle">
        <Trans>How many players do you want to play with?</Trans>
      </h3>

      <div className="my-[2em]">
        <div className="text-white text-[1.25em] font-medium mb-[.75em] text-center">
          <Trans>Room Name (Optional)</Trans>
        </div>
        <Input
          type="text"
          placeholder="Enter room name..."
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          maxLength={30}
          className="w-full max-w-[20em] bg-white/90 text-gray-800 placeholder-gray-500 border-2 border-white/50 focus:border-white focus:bg-white shadow-lg"
        />
      </div>

      <div className="flex">
        <CreateGameButton
          theme="pink"
          playerCount={2}
          roomName={roomName}
          onClick={handleCreateRoom}
        />
        <CreateGameButton
          theme="yellow"
          playerCount={3}
          roomName={roomName}
          onClick={handleCreateRoom}
        />
        <CreateGameButton
          theme="blue"
          playerCount={4}
          roomName={roomName}
          onClick={handleCreateRoom}
        />
      </div>
    </LobbyPage>
  );
};
