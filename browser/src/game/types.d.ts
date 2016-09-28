import {IBoard} from "../board/types";

export type IGame = {
  board: IBoard;
  actions: {
    addShip: (coordinate: {x: number, y: number}) => void;
  };
};
