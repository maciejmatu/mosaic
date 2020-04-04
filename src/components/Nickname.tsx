import * as React from "react";
import { useStoreState, useStoreActions } from "../store";
import { useState } from "react";

export const Nickname: React.FC = () => {
  const initialNickname = useStoreState(s => s.nickname);
  const persistNickname = useStoreActions(s => s.setNickname);
  const [nickname, setNickname] = useState(initialNickname || "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    persistNickname(nickname);
  };

  return (
    <div>
      Set your nickname
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={e => setNickname(e.target.value)}
          value={nickname}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
