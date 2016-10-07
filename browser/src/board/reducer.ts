import {boardRowReducer} from "./boardRow/reducer";
import {IBoard} from "./types";
import {PLAYER_PLACE_SHIP, LOAD_CPU_BOARD} from "../game/actions";
import {BOARD_SIZE} from "../utils/constants";

const initialState = _.range(0, BOARD_SIZE).map(() =>
  _.range(0, BOARD_SIZE).map(() => ({
    ship: false,
    destroyed: false,
  }))
);

export const boardReducer = (state: IBoard = initialState, action): IBoard => {
  switch (action.type) {
    case PLAYER_PLACE_SHIP:
      return state.map((boardRow, rowIndex) => (rowIndex == action.coordinates.y) ? boardRowReducer(boardRow, action) : boardRow);
    case LOAD_CPU_BOARD:
      return action.cpuBoard;
    default:
      return state;
  }
};
