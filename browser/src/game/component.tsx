import {Board} from "../board/component";
import {IGame} from "./types";
import {PLACE_SHIPS} from "../gameState/reducer";

const coordinateClickAction = (phase, actions) => {
  switch (phase) {
    case PLACE_SHIPS:
      return actions.addShip;
    default:
      return () => {};
  }
};

const coordinateThroughView = (funk) => (x) => (y) => () => funk({x, y});

export const Game = (props: IGame) => {
  const coordinateClick = coordinateThroughView(coordinateClickAction(props.gameState.phase, props.actions));
  return <Board board={props.board} coordinateClick={coordinateClick}></Board>;
};
