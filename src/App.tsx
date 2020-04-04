import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GameLobby, CreateGame } from "./components/Lobby";
import { Nickname } from "./components/Nickname";
import { StoreProvider } from "easy-peasy";
import { initializeStore, useStoreState } from "./store";
import {
  NICKNAME_STORAGE_KEY,
  PLAYER_STORAGE_KEY,
  StoreModel
} from "./store/store";

const savedNickname = localStorage.getItem(NICKNAME_STORAGE_KEY);
const savedPlayer = localStorage.getItem(PLAYER_STORAGE_KEY);

const store = initializeStore({
  nickname: savedNickname || null,
  activeRoomPlayer: savedPlayer ? JSON.parse(savedPlayer) : null
} as StoreModel);

const App: React.FC = () => {
  const nickname = useStoreState(s => s.nickname);

  return (
    <div className="App">
      <Switch>
        {/* TODO: Use modal for nickname creation instead of conditional rendering */}
        <Route exact path="/">
          {nickname ? <CreateGame /> : <Nickname />}
        </Route>

        <Route path="/rooms/:id">
          {nickname ? <GameLobby /> : <Nickname />}
        </Route>

        <Route path="/nickname">
          <Nickname />
        </Route>
      </Switch>
    </div>
  );
};

const AppRoot: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  );
};

export default AppRoot;
