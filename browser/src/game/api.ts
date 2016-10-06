import {IBoard} from "../board/types";
import {Fetch} from "../utils/fetch";

const base = "/game";

//remove when rails bug with nested arrays is fixed
const cleanBoard = ({playerBoard, cpuBoard, gameState}) => ({
  playerBoard: playerBoard.reduce((total, row) => total.concat(row)),
  cpuBoard: cpuBoard.reduce((total, row) => total.concat(row)),
  gameState
});

const GameApi = {
  show: () => Fetch.get(base),
  create: (game) => Fetch.post(base, {game: cleanBoard(game)}),
  update: (game) => Fetch.patch(base, {game}),
  guess: (guess) => GameApi.update({guess}),
  destroy: () => Fetch.delete(base),
};

export default GameApi;
