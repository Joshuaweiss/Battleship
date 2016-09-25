import {BoardRow} from "./boardRow/component";
import {rowCellsI} from "./boardRow/types";

export const Board = CSSModules(styles)((params: {board: rowCellsI[]}) => {
  return <div styleName="board">
    {params.board.map((boardRow, rowIndex) => <BoardRow rowCells={boardRow} rowIndex={rowIndex} key={rowIndex} />)}
  </div>;
});
