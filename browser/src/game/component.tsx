import {Board} from "../board/component";
import {IGame} from "./types";

export const Game = (props) => <Board board={props.board} coordinateClick={(x) => (y) => () => props.actions.addShip({x, y})}></Board>;
