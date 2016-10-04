import {combineReducers} from "redux";
import {boardReducer} from "../board/reducer";
import {Fetch} from "../utils/fetch";
import {gameStateReducer} from "../gameState/reducer";

export const GameReducer = combineReducers({
  board: boardReducer,
  gameState: gameStateReducer,
});
