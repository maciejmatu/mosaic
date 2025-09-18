import path from "path";
import serve from "koa-static";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import { Server } from "boardgame.io/server";
import { DEFAULT_PORT } from "../src/config";
import { MosaicGame } from "../src/game";

const root = path.join(__dirname, "../dist");
const PORT = Number(process.env.PORT || DEFAULT_PORT);

const server = Server({
  games: [MosaicGame],
  origins: [
    "http://localhost:8080",
    "http://localhost:3000",
    "https://mosaic.maciejmatu.com/",
  ],
});

server.app.use(
  historyApiFallback({
    index: "index.html",
    whiteList: ["/api", "/games", "/.well-known"],
  })
);
server.app.use(serve(root));

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
