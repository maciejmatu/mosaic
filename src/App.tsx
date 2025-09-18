import { StoreProvider } from "easy-peasy";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { CreateGame } from "./components/CreateGame";
import { GameLobby, GameLobbySpectator } from "./components/Lobby";
import { SetupNickname } from "./components/SetupNickname";
import { initializeStore, useStoreState } from "./store";
import {
  NICKNAME_STORAGE_KEY,
  PLAYER_STORAGE_KEY,
  StoreModel,
} from "./store/store";
import { Welcome } from "components/Welcome";
import { LobbyList } from "components/Lobby/List";

const savedNickname = localStorage.getItem(NICKNAME_STORAGE_KEY);
const savedPlayer = localStorage.getItem(PLAYER_STORAGE_KEY);

const store = initializeStore({
  nickname: savedNickname || null,
  activeRoomPlayer: savedPlayer ? JSON.parse(savedPlayer) : null,
} as StoreModel);

const App: React.FC = () => {
  const nickname = useStoreState((s) => s.nickname);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        {/* TODO: Use modal for nickname creation instead of conditional rendering */}
        <Route path="/" element={<Welcome />} />
        <Route path="/lobby" element={<LobbyList />} />
        <Route
          path="/create"
          element={nickname ? <CreateGame /> : <SetupNickname />}
        />
        <Route
          path="/rooms/:id"
          element={nickname ? <GameLobby /> : <SetupNickname />}
        />
        <Route
          path="/rooms/:id/watch/:watchId"
          element={<GameLobbySpectator />}
        />
        <Route
          path="/nickname"
          element={<SetupNickname onSubmit={() => navigate("/create")} />}
        />
      </Routes>
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
