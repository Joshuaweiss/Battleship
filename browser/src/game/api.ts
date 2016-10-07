import {IBoard} from "../board/types";
import {Fetch} from "../utils/fetch";

const base = "/game";

//remove when rails bug with nested arrays is fixed
const cleanBoard = ({playerBoard, cpuBoard, gameState}) => ({
  playerBoard: playerBoard.reduce((total, row) => total.concat(row)),
  cpuBoard: cpuBoard.reduce((total, row) => total.concat(row)),
  gameState
});

const responseToState = (response) => {
  if (!(response && response.data && response.data.attributes)) {
    return null;
  }
  const game = response.data.attributes;
  return {
    playerBoard: game.playerBoard,
    cpuBoard: game.cpuBoard,
    gameState: (Object.keys(game).length === 0) ? undefined : _.pick(game, ["phase", "won"]),
  };
};

const GameApi = {
  show: () => Fetch.get(base).then(responseToState),
  create: (game) => Fetch.post(base, {game: cleanBoard(game)}).then(responseToState),
  update: (game) => Fetch.patch(base, {game}).then(responseToState),
  guess: (guess) => GameApi.update({guess}),
  destroy: () => Fetch.delete(base),
};

export default GameApi;
