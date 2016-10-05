import {PLAYER_PLACE_SHIP} from "../../../game/actions";

export const boardCellReducer = (state, action) => {
  switch (action.type) {
    case PLAYER_PLACE_SHIP:
      return _.merge({}, state, {ship: true});
    default:
      return state;
  }
};
