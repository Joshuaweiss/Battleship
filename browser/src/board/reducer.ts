import {boardRowReducer} from "./boardRow/reducer";
import {IBoard} from "./types";
import {CPU_PLACE_SHIPS, PLAYER_PLACE_SHIP, LOAD_GAME} from "../game/actions";

const initialState = _.range(0, 5).map(() =>
  _.range(0, 5).map(() => ({
    ship: false,
    destroyed: false,
    enemy: false
  }))
);

export const boardReducer = (state: IBoard = initialState, action): IBoard => {
  switch (action.type) {
    case LOAD_GAME:
      return action.game.board;
    case PLAYER_PLACE_SHIP:
      return state.map((boardRow, rowIndex) => (rowIndex == action.coordinates.y) ? boardRowReducer(boardRow, action) : boardRow);
    case CPU_PLACE_SHIPS:
      return action.game.board;
    default:
      return state;
  }
};
