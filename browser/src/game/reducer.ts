import {combineReducers} from "redux";
import {boardReducer} from "../board/reducer";
import {gameStateReducer} from "../gameState/reducer";

export const GameReducer = combineReducers({
  board: boardReducer,
  gameState: gameStateReducer
});
