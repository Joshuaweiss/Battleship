import {Board} from "../board/component";
import {GameState} from "../gameState/component";
import {IGame} from "./types";
import {PLACE_SHIPS, GUESS} from "../gameState/phases";

const noop = () => {};

type coordinateFunk = (coordinate: {x: number, y: number} | undefined) => void
type coordinateClickActions = {
  playerBoard: coordinateFunk,
  cpuBoard: coordinateFunk,
}
const makeCoordinateClickActions = (phase, actions):  coordinateClickActions => {
  switch (phase) {
    case PLACE_SHIPS:
      return {
        playerBoard: actions.submitShip,
        cpuBoard: noop,
      };
    case GUESS:
      return {
        playerBoard: noop,
        cpuBoard: actions.submitGuess,
      };
    default:
      return {
        playerBoard: noop,
        cpuBoard: noop,
      };
  }
};

const coordinateThroughView = (funk) => (y) => (x) => () => funk({x, y});

export const Game = CSSModules(styles)((props: IGame) => {
  const coordinateClick = makeCoordinateClickActions(props.gameState.phase, props.actions);
  return <div>
    <div styleName="boards">
      <Board board={props.playerBoard} coordinateClick={coordinateThroughView(coordinateClick.playerBoard)} />
      <div styleName="spacer" />
      <Board board={props.cpuBoard} coordinateClick={coordinateThroughView(coordinateClick.cpuBoard)} />
    </div>
    <GameState gameState={props.gameState} newGame={props.actions.newGame} />
  </div>;
});
