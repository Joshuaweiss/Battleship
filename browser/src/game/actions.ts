import {Fetch} from "../utils/fetch";
import GameApi from "./api";

import {waitForCpu} from "../gameState/reducer";

//actions type
export const LOAD_GAME = "LOAD_GAME";
export const GUESS = "GUESS";
export const CPU_PLACE_SHIPS = "CPU_PLACE_SHIPS";
export const PLAYER_PLACE_SHIP = "PLAYER_PLACE_SHIP";
export const WAITING_FOR_CPU = "WAITING_FOR_CPU";
export const CPU_GUESS = "CPU_GUESS";
export const LOAD_CPU_BOARD = "LOAD_CPU_BOARD";


export const playerPlaceShip = (coordinates) => ({
  type: PLAYER_PLACE_SHIP,
  coordinates,
});

export const cpuPlacedShips = (board) => ({
  type: CPU_PLACE_SHIPS,
  board,
});


//This is an open issue in rails https://github.com/rails/rails/issues/23640
const fixNestedArraysForRails = (board) => board.reduce((total, row) => total.concat(row));

export const getGame = () => (
  (dispatch, getState) => {
    GameApi.show().then((game) => {
      if (game) {
        dispatch(loadGame(game));
      }
    })
  }
);

export const loadGame = (game) => ({
  type: LOAD_GAME,
  game,
});

const countShips = (board) => (
  _.sum(
    board.map((row) =>
      row.filter((cell) => cell.ship).length
    )
  )
);

export const submitShips = () => (
  (dispatch, getState) => {
    if (countShips(getState().playerBoard) === 5) {
      dispatch(waitForCpu());
      GameApi.create(getState()).then((game) =>
        dispatch(loadGame(game))
      );
    }
  }
);

export const submitShip = (coordinates) => (
  (dispatch, getState) => {
    dispatch(playerPlaceShip(coordinates))
    dispatch(submitShips());
  }
);

const loadCpuBoard = (cpuBoard) => ({
  type: LOAD_CPU_BOARD,
  cpuBoard,
});

export const submitGuess = (coordinate) => (
  (dispatch, getState) => {
    GameApi.guess([coordinate.x, coordinate.y]).then((game) => {
      dispatch(loadCpuBoard(game.cpuBoard))

      dispatch(waitForCpu());
      setTimeout(() => {
        dispatch(loadGame(game));
      }, 1000);
    })
  }
);

export const newGame = () => loadGame({});
