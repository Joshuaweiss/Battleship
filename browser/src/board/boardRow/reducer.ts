import {ADD_SHIP} from "../../gameState/reducer";

import {boardCellReducer} from "./boardCell/reducer";

export const boardRowReducer = (state, action) => {
  switch (action.type) {
    case ADD_SHIP:
      return state.map((cell, cellIndex) => (cellIndex == action.coordinates.y) ? boardCellReducer(cell, action) : cell);
    default:
      return state; 
  }
} 
