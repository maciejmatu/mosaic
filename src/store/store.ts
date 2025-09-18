import { Action, action, thunk, Thunk } from "easy-peasy";
import { StoreInjections } from ".";
import {
  RoomMetadata,
  JoinRoomParams,
  ActiveRoomPlayer,
  RoomSummary,
} from "../services/lobby-service";

export interface StoreModel {
  nickname: string | null;
  setNickname: Action<StoreModel, string>;
  roomID: string | null;
  setRoomID: Action<StoreModel, string>;
  createGameRoom: Thunk<
    StoreModel,
    { numPlayers: number; roomName?: string },
    StoreInjections
  >;
  roomMetadata: RoomMetadata | null;
  setRoomMetadata: Action<StoreModel, RoomMetadata>;
  loadRoomMetadata: Thunk<StoreModel, string, StoreInjections>;
  rooms: RoomSummary[];
  setRooms: Action<StoreModel, RoomSummary[]>;
  loadRooms: Thunk<StoreModel, void, StoreInjections>;
  activeRoomPlayer: ActiveRoomPlayer | null;
  setActiveRoomPlayer: Action<StoreModel, ActiveRoomPlayer>;
  joinRoom: Thunk<StoreModel, JoinRoomParams, StoreInjections>;
  startGame: Thunk<StoreModel, string, StoreInjections>;
  clearGameState: Action<StoreModel>;
  showRulebook: boolean;
  setShowRulebook: Action<StoreModel, boolean>;
  reset: Action<StoreModel>;
}

// nickname is used between games to simplify room user creation
export const NICKNAME_STORAGE_KEY = "mosaic_nickname";

// 'player' refers to users player in the game room
export const PLAYER_STORAGE_KEY = "mosaic_player";

export let initState: any = {};
export const setInitState = (state?: StoreModel) => {
  if (state) initState = state;
};

export const store: StoreModel = {
  nickname: null,
  setNickname: action((state, nickname) => {
    localStorage.setItem(NICKNAME_STORAGE_KEY, nickname);
    state.nickname = nickname;
  }),

  roomID: null,
  setRoomID: action((state, payload) => {
    state.roomID = payload;
  }),
  createGameRoom: thunk(async (actions, payload, { injections }) => {
    // Clear previous game state before creating new room
    actions.clearGameState();

    gtag("event", "create-game-room", { playerCount: payload.numPlayers });
    const roomID = await injections.lobbyApi.createRoom(
      payload.numPlayers,
      payload.roomName
    );
    actions.setRoomID(roomID);
  }),

  roomMetadata: null,
  setRoomMetadata: action((state, payload) => {
    state.roomMetadata = payload;
  }),
  loadRoomMetadata: thunk(async (actions, payload, { injections }) => {
    const metadata = await injections.lobbyApi.getRoomMetadata(payload);
    actions.setRoomMetadata(metadata);
  }),

  rooms: [],
  setRooms: action((state, payload) => {
    state.rooms = payload;
  }),
  loadRooms: thunk(async (actions, _payload, { injections }) => {
    const res = await injections.lobbyApi.listRooms();
    actions.setRooms(res.matches || []);
  }),

  activeRoomPlayer: null,
  setActiveRoomPlayer: action((state, payload) => {
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(payload));
    state.activeRoomPlayer = payload;
  }),
  joinRoom: thunk(async (actions, payload, { injections }) => {
    // Clear previous game state before joining new room
    actions.clearGameState();

    const { playerCredentials } = await injections.lobbyApi.joinRoom(payload);
    actions.setActiveRoomPlayer({
      credential: playerCredentials,
      playerID: payload.playerID,
    });
  }),

  startGame: thunk(async (actions, roomID, { injections }) => {
    await injections.lobbyApi.startGame(roomID);
  }),

  clearGameState: action((state) => {
    // Clear game-related state when joining a new room
    state.roomMetadata = null;
    state.activeRoomPlayer = null;
    state.showRulebook = false;
    // Clear from localStorage as well
    localStorage.removeItem(PLAYER_STORAGE_KEY);
  }),

  showRulebook: false,
  setShowRulebook: action((state, payload) => {
    state.showRulebook = payload;
  }),

  reset: action(() => initState),
};
