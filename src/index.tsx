import React from "react";
import { render } from "react-dom";
import "./styles/index.scss";
import "./i18n";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn:
    "https://4669277ed5b645d88c7fe21224a8be51@o104850.ingest.sentry.io/5383257",
});

render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
