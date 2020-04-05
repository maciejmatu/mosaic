import React from "react";
import { Redirect } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store";
import "./style.scss";
import { ButtonChangeNickname } from "../ButtonChangeNickname";

export const CreateGame: React.FC = () => {
  const createGameRoom = useStoreActions(s => s.createGameRoom);
  const nickname = useStoreState(s => s.nickname);
  const roomID = useStoreState(s => s.roomID);

  if (roomID) return <Redirect to={`/rooms/${roomID}`} />;

  return (
    <div className="CreateGame__page">
      <ButtonChangeNickname />
      <h3 className="CreateGame__title">Welcome {nickname}!</h3>
      <h3 className="CreateGame__subtitle">Create Game Room</h3>
      <div className="CreateGame__options">
        <button
          className="CreateGame__button"
          onClick={() => createGameRoom(2)}
        >
          2
          <br />
          Players
        </button>
        <button
          className="CreateGame__button"
          onClick={() => createGameRoom(3)}
        >
          3
          <br />
          players
        </button>
        <button
          className="CreateGame__button"
          onClick={() => createGameRoom(4)}
        >
          4
          <br />
          players
        </button>
      </div>
    </div>
  );
};
