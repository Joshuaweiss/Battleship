import {IGameState} from "./types";
import {LOAD_GAME} from "../game/actions";
import {PLACE_SHIPS, WAITING_FOR_CPU} from "./phases";

const initialState = {
  phase: PLACE_SHIPS,
}

const WAIT_FOR_CPU = "WAIT_FOR_CPU";

export const waitForCpu = () => ({
  type: WAIT_FOR_CPU
})

export const gameStateReducer = (state: IGameState = initialState, action): IGameState => {
  switch (action.type) {
    case WAIT_FOR_CPU:
      return _.merge({}, {phase: WAITING_FOR_CPU});
    default:
      return state;
  }
}
