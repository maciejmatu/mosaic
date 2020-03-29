import React from "react";
import { MosaicGame } from "./components/MosaicGame";
import { MosaicBoard } from "./components/MosaicBoard";
import { Lobby, Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";

// local play example
// const Game = Client({
//   game: MosaicGame,
//   board: MosaicBoard,
//   numPlayers: 3,
//   multiplayer: Local()
// });

const url =
  window.location.protocol +
  "//" +
  window.location.hostname +
  (window.location.port ? ":" + window.location.port : "");
const GAMEPORT = process.env.PORT || 3001;
const serverPath =
  process.env.NODE_ENV === "production"
    ? `${url}`
    : `${window.location.hostname}:${GAMEPORT}`;

function App() {
  return (
    <div className="App">
      <Lobby
        gameServer={serverPath}
        lobbyServer={serverPath}
        gameComponents={[{ game: MosaicGame, board: MosaicBoard }]}
      />
    </div>
  );
}

export default App;
