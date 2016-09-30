import {IGameState} from "./types";

//actions type
export const ADD_SHIP = "ADD_SHIP";
export const GUESS = "GUESS";
export const CPU_PLACED_SHIPS = "CPU_PLACED_SHIPS";
export const CPU_GUESS = "CPU_GUESS";

//phase
export const GUESS_RESPONSE = "GUESS_RESPONSE";
export const PLACE_SHIPS = "PLACE_SHIPS";
export const WAITING_FOR_CPU = "WAITING_FOR_CPU";
export const TURN_TO_GUESS = "GUESS";
export const GAME_OVER = "GAME_OVER"

const initialState = {
  phase: PLACE_SHIPS,
  shipsPlaced: 0,
};

export const gameStateReducer = (state: IGameState = initialState, action): IGameState => {
  switch (action.type) {
    case ADD_SHIP:
      const shipsPlaced = state.shipsPlaced + 1;
      const phase = (shipsPlaced == 5) ? WAITING_FOR_CPU : PLACE_SHIPS;
      return _.merge({}, state, {shipsPlaced, phase});
    case GUESS:
      return _.merge(state, {phase: WAITING_FOR_CPU});
    case CPU_PLACED_SHIPS:
    case CPU_GUESS:
      const addMessages = (action.message) ? {message: state.messages + action.messages} : {};
      return _.merge(state, {phase: TURN_TO_GUESS}, addMessages);
    default:
      return state;
  }
};

export const addShip = (coordinates) => ({
  type: ADD_SHIP,
  coordinates,
});

export const cpuPlacedShips = (board) => ({
  type: CPU_PLACED_SHIPS,
  board
});

export const guess_response = (board) => ({
  type: GUESS_RESPONSE,
  board
});

export const submitGuess = (coordinates) => (
  (dispatch, getState) => {
    dispatch()
  }
);

export const submitShips = () => (
  (dispatch, getState) => {
    if (getState().gameState.phase == WAITING_FOR_CPU) {
      dispatch()
    }
  }
);
