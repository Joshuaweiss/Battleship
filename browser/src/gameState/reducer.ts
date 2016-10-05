import {IGameState} from "./types";

export const gameStateReducer = (state: IGameState = {}, action): IGameState => {
  switch (action.type) {
    default:
      return state;
  }
}
