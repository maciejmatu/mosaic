import path from "path";
import serve from "koa-static";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import { Server } from "boardgame.io/server";
import { DEFAULT_PORT } from "../src/config";
import { MosaicGame } from "../src/game";

const root = path.join(__dirname, "../build");
const PORT = process.env.PORT || DEFAULT_PORT;

const server = Server({ games: [MosaicGame] });

server.app.use(
  historyApiFallback({ index: "index.html", whiteList: ["/api", "/games"] })
);
server.app.use(serve(root));

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
