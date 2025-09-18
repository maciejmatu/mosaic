import { createRoot } from "react-dom/client";
import "./i18n";
import App from "./App";
import * as Sentry from "@sentry/react";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
  });
} else {
  console.warn("SENTRY_DSN is not set. Skipping Sentry initialization.");
}

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root not found");
const root = createRoot(container);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
