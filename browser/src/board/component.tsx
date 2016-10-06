import {BoardRow} from "./boardRow/component";
import {IBoard} from "./types";

export const Board = CSSModules(styles)((props: {board: IBoard, coordinateClick: (x) => (y) => () => void}) => (
  <div styleName="board">{
    props.board.map(
      (boardRow, rowIndex) => <BoardRow coordinateClick={props.coordinateClick(rowIndex)} boardRow={boardRow} key={rowIndex} />
    )
  }</div>
));
