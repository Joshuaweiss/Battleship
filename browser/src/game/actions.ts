import {Fetch} from "../utils/fetch";
import GameApi from "./api";

//actions type
export const LOAD_GAME = "LOAD_GAME";
export const GUESS = "GUESS";
export const CPU_PLACE_SHIPS = "CPU_PLACE_SHIPS";
export const PLAYER_PLACE_SHIP = "PLAYER_PLACE_SHIP";
export const WAITING_FOR_CPU = "WAITING_FOR_CPU";
export const CPU_GUESS = "CPU_GUESS";


export const playerPlaceShip = (coordinates) => ({
  type: PLAYER_PLACE_SHIP,
  coordinates,
});

export const cpuPlacedShips = (board) => ({
  type: CPU_PLACE_SHIPS,
  board,
});


const responseToState = (game) => ({
  playerBoard: game.playerBoard,
  cpuBoard: game.cpuBoard,
  gameState: (Object.keys(game).length === 0) ? undefined : _.pick(game, ["phase", "won"]),
});


//This is an open issue in rails https://github.com/rails/rails/issues/23640
const fixNestedArraysForRails = (board) => board.reduce((total, row) => total.concat(row));

export const getGame = () => (
  (dispatch, getState) => {
    GameApi.show().then((response) => {
      const game = response && response.data.attributes;
      if (game) {
        dispatch(loadGame(game));
      }
    })
  }
);

export const loadGame = (game) => ({
  type: LOAD_GAME,
  game: responseToState(game),
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
      GameApi.create(getState()).then((response) => {
        const game = response.data.attributes;
        dispatch(loadGame(game));
      });
    }
  }
);

export const submitShip = (coordinates) => (
  (dispatch, getState) => {
    dispatch(playerPlaceShip(coordinates))
    dispatch(submitShips());
  }
);

export const submitGuess = (coordinate) => (
  (dispatch, getState) => {
    GameApi.guess([coordinate.x, coordinate.y]).then((response) => {
      const game = response.data.attributes;
      dispatch(loadGame(game));
    })
  }
);

export const newGame = () => loadGame({});
