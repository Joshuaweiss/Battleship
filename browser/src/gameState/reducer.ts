import {IGameState} from "./types";
import {LOAD_GAME} from "../game/actions";

export const gameStateReducer = (state: IGameState = {}, action): IGameState => {
  switch (action.type) {
    case LOAD_GAME:
      return action.game.gameState;
    default:
      return state;
  }
}
