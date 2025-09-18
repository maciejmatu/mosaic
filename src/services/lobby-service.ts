import ky from "ky";
import { SERVER_URL } from "../config/client";
import { GAME_ID } from "../config";

export interface Player {
  id: number;
  name?: string;
}

export interface RoomMetadata {
  players: Player[];
  setupData?: { roomName?: string };
}

export interface RoomSummary {
  matchID: string;
  players: Player[];
  setupData?: { roomName?: string };
  gameover?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActiveRoomPlayer {
  playerID: number;
  credential: string;
}

export interface JoinRoomParams {
  roomID: string;
  playerID: number;
  playerName: string;
}

export class LobbyService {
  api: typeof ky;

  constructor() {
    this.api = ky.create({ prefixUrl: `${SERVER_URL}/games/${GAME_ID}` });
  }

  async createRoom(numPlayers: number, roomName?: string): Promise<string> {
    const data = await this.api
      .post("create", {
        json: { numPlayers, setupData: roomName ? { roomName } : undefined },
      })
      .json<{ matchID: string }>();

    return data.matchID;
  }

  async joinRoom({
    roomID,
    ...json
  }: JoinRoomParams): Promise<{ playerCredentials: string }> {
    const { playerCredentials } = await this.api
      .post(roomID + "/join", {
        json: json,
      })
      .json<{ playerCredentials: string }>();

    return {
      playerCredentials,
    };
  }

  async getRoomMetadata(roomID: string): Promise<RoomMetadata> {
    return await this.api.get(roomID).json<{ players: Player[] }>();
  }

  async listRooms(): Promise<{ matches: RoomSummary[] }> {
    return await this.api.get("").json<{ matches: RoomSummary[] }>();
  }

  async startGame(roomID: string): Promise<void> {
    await this.api.post(roomID + "/start", { json: {} });
  }
}
