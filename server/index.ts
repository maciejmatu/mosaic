import path from "path";
import serve from "koa-static";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import { Server } from "boardgame.io/server";
import { DEFAULT_PORT } from "../src/config";
import { MosaicGame } from "../src/game";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn:
    "https://ae87b4488f294c0fa382a15b06da8864@o431642.ingest.sentry.io/5383278",
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
