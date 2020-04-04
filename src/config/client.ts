import { isProduction, DEFAULT_PORT } from ".";

const { origin, protocol, hostname } = window.location;
export const SERVER_URL = isProduction
  ? origin
  : `${protocol}//${hostname}:${DEFAULT_PORT}`;
