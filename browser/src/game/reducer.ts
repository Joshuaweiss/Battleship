import {combineReducers} from "redux";
import {gameStateReducer} from "../gameState/reducer";
import {boardReducer} from "../board/reducer";
import {IGame} from "./types";
import {LOAD_GAME, PLAYER_PLACE_SHIP} from "./actions";

const combinedReducer = combineReducers({
  playerBoard: boardReducer,
  cpuBoard: boardReducer,
  gameState: gameStateReducer,
});

export const GameReducer = (state: IGame = {}, action): IGame => {
  switch (action.type) {
    case PLAYER_PLACE_SHIP:
      return _.merge({}, state, {playerBoard: boardReducer(state.playerBoard, action)});
    case LOAD_GAME:
      return combinedReducer(action.game, action);
    default:
      return combinedReducer(state, action);
  }
};
