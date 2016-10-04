import {boardRowReducer} from "./boardRow/reducer";
import {IBoard} from "./types";
import {CPU_PLACED_SHIPS, ADD_SHIP} from "../game/actions";

const initialState = _.range(0, 5).map(() =>
  _.range(0, 5).map(() => ({
    ship: false,
    destroyed: false,
    enemy: false
  }))
);

export const boardReducer = (state = initialState, action): IBoard => {
  switch (action.type) {
    case ADD_SHIP:
      return state.map((boardRow, rowIndex) => (rowIndex == action.coordinates.x) ? boardRowReducer(boardRow, action) : boardRow);
    case CPU_PLACED_SHIPS:
    default:
      return state;
  }
};
