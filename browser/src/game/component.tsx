import {Board} from "../board/component";
import {IGame} from "./types";
import {PLACE_SHIPS, GUESS} from "../gameState/phases";

const coordinateClickAction = (phase, actions) => {
  switch (phase) {
    case PLACE_SHIPS:
      return actions.submitShip;
    case GUESS:
      return actions.submitGuess;
    default:
      return () => {};
  }
};

const coordinateThroughView = (funk) => (y) => (x) => () => funk({x, y});

export const Game = (props: IGame) => {
  const coordinateClick = coordinateThroughView(coordinateClickAction(props.gameState.phase, props.actions));
  return <Board board={props.board} coordinateClick={coordinateClick}></Board>;
};
