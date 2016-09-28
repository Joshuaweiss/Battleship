import {BoardRow} from "./boardRow/component";
import {IBoard} from "./types";

export const Board = CSSModules(styles)((params: {board: IBoard, coordinateClick: (x) => (y) => () => void}) => (
  <div styleName="board">{
    params.board.map(
      (boardRow, rowIndex) => <BoardRow coordinateClick={params.coordinateClick(rowIndex)} boardRow={boardRow} key={rowIndex} />
    )
  }</div>
));
