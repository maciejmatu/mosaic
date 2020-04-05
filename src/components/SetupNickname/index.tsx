import * as React from "react";
import "./style.scss";
import { useStoreState, useStoreActions } from "../../store";
import { useState } from "react";
import { ButtonBack } from "../ButtonBack";

export const SetupNickname: React.FC<{ onSubmit?: () => void }> = ({
  onSubmit
}) => {
  const initialNickname = useStoreState(s => s.nickname);
  const persistNickname = useStoreActions(s => s.setNickname);
  const [nickname, setNickname] = useState(initialNickname || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    persistNickname(nickname);
    onSubmit && onSubmit();
  };

  return (
    <div className="SetupNickname__page">
      <ButtonBack to="/" />
      <h3 className="SetupNickname__title">Set your nickname</h3>
      <form onSubmit={handleSubmit} className="SetupNickname__form">
        <input
          className="SetupNickname__input"
          type="text"
          onChange={e => setNickname(e.target.value)}
          value={nickname}
        />
        <button className="SetupNickname__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
