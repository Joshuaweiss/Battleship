import {boardRowReducer} from "./boardRow/reducer";

export const ADD_SHIP = "ADD_SHIP";

export const addShip = (coordinates) => ({
  type: ADD_SHIP,
  coordinates,
});


const initialState = _.range(0, 5).map(() =>
  _.range(0, 5).map(() => ({
    ship: false,
    destroyed: false,
    enemy: false
  }))
);

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHIP:
      return state.map((boardRow, rowIndex) => (rowIndex == action.coordinates.x) ? boardRowReducer(boardRow, action) : boardRow);
    default:
      return state;
  }
};
