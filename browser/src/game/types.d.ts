import {IBoard} from "../board/types";
import {IGameState} from "../gameState/types";

export type IGame = {
  board?: IBoard,
  gameState?: IGameState,
  actions?: {
    addShip?: (coordinate: {x: number, y: number}) => void,
  },
};
