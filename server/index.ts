import path from "path";
import serve from "koa-static";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import { Server } from "boardgame.io/server";
import { MosaicGame } from "../src/components/MosaicGame";

const root = path.join(__dirname, "./build");
const PORT = process.env.PORT || 3001;

const server = Server({ games: [MosaicGame] });

server.app.use(
  historyApiFallback({ index: "index.html", whiteList: ["/api", "/games"] })
);
server.app.use(serve(root));

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
