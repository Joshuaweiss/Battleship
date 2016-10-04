import {GUESS_RESPONSE, WAITING_FOR_CPU} from "../gameState/reducer"
import {Fetch} from "../utils/fetch";
import GameApi from "./api";

//actions type
export const LOAD_GAME = "LOAD_GAME";
export const ADD_SHIP = "ADD_SHIP";
export const GUESS = "GUESS";
export const CPU_PLACED_SHIPS = "CPU_PLACED_SHIPS";
export const CPU_GUESS = "CPU_GUESS";

export const addShip = (coordinates) => ({
  type: ADD_SHIP,
  coordinates,
});

export const cpuPlacedShips = (board) => ({
  type: CPU_PLACED_SHIPS,
  board,
});


//This is an open issue in rails https://github.com/rails/rails/issues/23640
const fixNestedArraysForRails = (board) => board.reduce((total, row) => total.concat(row));

export const getGame = () => (
  (dispatch, getState) => {
    GameApi.show().then((response) => {
      if (response) {
        debugger 
      }
    })
  }
)

export const loadGame = (game) => ({
  type: LOAD_GAME,
  game
})

export const submitShips = () => (
  (dispatch, getState) => {
    if (getState().gameState.phase == WAITING_FOR_CPU) {
      GameApi.create(getState()).then((response) => {
        debugger
      });
    }
  }
);

export const submitGuess = (coordinates) => (
  (dispatch, getState) => {
    dispatch(addShip(coordinates))
    dispatch(submitShips());
  }
)
