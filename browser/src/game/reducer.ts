import {combineReducers} from "redux";
import {boardReducer} from "../board/reducer";

export const GameReducer = combineReducers({
  board: boardReducer,
});
