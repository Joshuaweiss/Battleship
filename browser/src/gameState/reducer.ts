import {IGameState} from "./types";
import {LOAD_GAME} from "../game/actions";
import {PLACE_SHIPS} from "./phases";

const initialState = {
  phase: PLACE_SHIPS,
}

export const gameStateReducer = (state: IGameState = initialState, action): IGameState => {
  switch (action.type) {
    default:
      return state;
  }
}
