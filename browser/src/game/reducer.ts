import {combineReducers} from "redux";
import {gameStateReducer} from "../gameState/reducer";
import {boardReducer} from "../board/reducer";

export const GameReducer = combineReducers({
  board: boardReducer,
  gameState: gameStateReducer,
});
