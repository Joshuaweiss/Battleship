import {rowCellsI} from "./types";
import {BoardCell} from "./boardCell/component";

const boardCell = (rowIndex) => (boardCell, columnIndex) => <BoardCell boardCell={boardCell} key={columnIndex} coordinates={{x: columnIndex, y: rowIndex}} />;

export const BoardRow = CSSModules(styles)((props: {rowCells: rowCellsI, rowIndex: number}): JSX.Element => {
  return <div styleName="boardRow">{ props.rowCells.map(boardCell(props.rowIndex)) }</div>;
});
