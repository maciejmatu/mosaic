import React from "react";
import { render } from "react-dom";
import "./styles/index.scss";
import "./i18n";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn:
    "https://d324227e5213419caba1bd1d49a3eabe@o431642.ingest.sentry.io/5383276",
});

render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
