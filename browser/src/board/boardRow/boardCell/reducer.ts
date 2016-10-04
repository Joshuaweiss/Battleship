import {ADD_SHIP} from "../../../game/actions";

export const boardCellReducer = (state, action) => {
  switch (action.type) {
    case ADD_SHIP:
      return _.merge({}, state, {ship: true});
    default:
      return state;
  }
};
