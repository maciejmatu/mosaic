import React from "react";
import { Redirect } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store";
import "./style.scss";
import { ButtonChangeNickname } from "../ButtonChangeNickname";
import { Trans } from "react-i18next";
import { ButtonLang } from "components/ButtonLang";
import { Button, ButtonProps } from "components/Button";
import { LobbyPage, SmallLogo } from "components/LobbyPage";

interface Props {
  playerCount: number;
  onClick(playerCount: number): void;
}

const CreateGameButton: React.FC<ButtonProps & Props> = ({
  playerCount,
  onClick,
  ...props
}) => {
  return (
    <Button
      className="CreateGameButton"
      onClick={() => onClick(playerCount)}
      {...props}
    >
      <span className="CreateGameButton__count">{playerCount}</span>
      <Trans>Players</Trans>
    </Button>
  );
};

export const CreateGame: React.FC = () => {
  const createGameRoom = useStoreActions((s) => s.createGameRoom);
  const nickname = useStoreState((s) => s.nickname);
  const roomID = useStoreState((s) => s.roomID);

  if (roomID) return <Redirect to={`/rooms/${roomID}`} />;

  return (
    <LobbyPage>
      <SmallLogo />
      <ButtonChangeNickname />
      <ButtonLang />

      <h3 className="CreateGame__title">
        <Trans>Welcome {{ nickname }}!</Trans>
      </h3>
      <h3 className="CreateGame__subtitle">
        <Trans>How many players do you want to play with?</Trans>
      </h3>
      <div className="CreateGame__options">
        <CreateGameButton
          theme="pink"
          playerCount={2}
          onClick={createGameRoom}
        />
        <CreateGameButton
          theme="yellow"
          playerCount={3}
          onClick={createGameRoom}
        />
        <CreateGameButton
          theme="blue"
          playerCount={4}
          onClick={createGameRoom}
        />
      </div>
    </LobbyPage>
  );
};
