import path from "path";
import serve from "koa-static";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import { Server } from "boardgame.io/server";
import { DEFAULT_PORT } from "../src/config";
import { MosaicGame } from "../src/game";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn:
    "https://6be923cf35d44170bd0fd8e9804c1ba9@o104850.ingest.sentry.io/5383259",
});

const root = path.join(__dirname, "../build");
const PORT = Number(process.env.PORT || DEFAULT_PORT);

const server = Server({ games: [MosaicGame] });

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
