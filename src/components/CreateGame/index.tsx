import React from "react";
import { Redirect } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store";
import "./style.scss";
import { ButtonChangeNickname } from "../ButtonChangeNickname";
import { Trans } from "react-i18next";
import { Logo } from "components/Logo";
import { ButtonLang } from "components/ButtonLang";

interface Props {
  playerCount: number;
  onClick(playerCount: number): void;
}

const CreateGameButton: React.FC<Props> = ({ playerCount, onClick }) => {
  return (
    <button className="CreateGameButton" onClick={() => onClick(playerCount)}>
      <span className="CreateGameButton__count">{playerCount}</span>
      <Trans>Players</Trans>
    </button>
  );
};

export const CreateGame: React.FC = () => {
  const createGameRoom = useStoreActions((s) => s.createGameRoom);
  const nickname = useStoreState((s) => s.nickname);
  const roomID = useStoreState((s) => s.roomID);

  if (roomID) return <Redirect to={`/rooms/${roomID}`} />;

  return (
    <div className="CreateGame__page">
      <Logo size="small" className="CreateGame__logo" />
      <ButtonChangeNickname />
      <ButtonLang />

      <h3 className="CreateGame__title">
        <Trans>Welcome {{ nickname }}!</Trans>
      </h3>
      <h3 className="CreateGame__subtitle">
        <Trans>How many players do you want to play with?</Trans>
      </h3>
      <div className="CreateGame__options">
        <CreateGameButton playerCount={2} onClick={createGameRoom} />
        <CreateGameButton playerCount={3} onClick={createGameRoom} />
        <CreateGameButton playerCount={4} onClick={createGameRoom} />
      </div>
    </div>
  );
};
