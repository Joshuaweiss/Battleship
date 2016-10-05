import {PLAYER_PLACE_SHIP} from "../../game/actions";

import {boardCellReducer} from "./boardCell/reducer";

export const boardRowReducer = (state, action) => {
  switch (action.type) {
    case PLAYER_PLACE_SHIP:
      return state.map((cell, cellIndex) => (cellIndex == action.coordinates.x) ? boardCellReducer(cell, action) : cell);
    default:
      return state; 
  }
} 
