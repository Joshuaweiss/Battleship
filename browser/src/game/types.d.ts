import {IBoard} from "../board/types";
import {IGameState} from "../gameState/types";

export type IGame = {
  playerBoard?: IBoard,
  cpuBoard?: IBoard,
  gameState?: IGameState,
  actions?: {
    addShip?: (coordinate: {x: number, y: number}) => void,
    newGame?: () => void,
  },
};
