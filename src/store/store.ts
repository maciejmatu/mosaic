import { Action, action, thunk, Thunk } from "easy-peasy";
import { StoreInjections } from ".";
import {
  RoomMetadata,
  JoinRoomParams,
  ActiveRoomPlayer,
} from "../services/lobby-service";

export interface StoreModel {
  nickname: string | null;
  setNickname: Action<StoreModel, string>;
  roomID: string | null;
  setRoomID: Action<StoreModel, string>;
  createGameRoom: Thunk<StoreModel, number, StoreInjections>;
  roomMetadata: RoomMetadata | null;
  setRoomMetadata: Action<StoreModel, RoomMetadata>;
  loadRoomMetadata: Thunk<StoreModel, string, StoreInjections>;
  activeRoomPlayer: ActiveRoomPlayer | null;
  setActiveRoomPlayer: Action<StoreModel, ActiveRoomPlayer>;
  joinRoom: Thunk<StoreModel, JoinRoomParams, StoreInjections>;
  reset: Action;
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
    const roomID = await injections.lobbyApi.createRoom(payload);
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

  activeRoomPlayer: null,
  setActiveRoomPlayer: action((state, payload) => {
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(payload));
    state.activeRoomPlayer = payload;
  }),
  joinRoom: thunk(async (actions, payload, { injections }) => {
    const { playerCredentials } = await injections.lobbyApi.joinRoom(payload);
    actions.setActiveRoomPlayer({
      credential: playerCredentials,
      playerID: payload.playerID,
    });
  }),

  reset: action(() => initState),
};
