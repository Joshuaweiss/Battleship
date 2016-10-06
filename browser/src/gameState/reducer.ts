import {IGameState} from "./types";
import {LOAD_GAME} from "../game/actions";
import {PLACE_SHIPS} from "./phases";

const initialState = {
  phase: PLACE_SHIPS,
}

export const gameStateReducer = (state: IGameState = initialState, action): IGameState => {
  switch (action.type) {
    case LOAD_GAME:
      return action.game.gameState || initialState;
    default:
      return state;
  }
}
