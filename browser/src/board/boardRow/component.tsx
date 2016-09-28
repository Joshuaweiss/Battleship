import {IBoardRow} from "./types";
import {BoardCell} from "./boardCell/component";


export const BoardRow = CSSModules(styles)((props: {boardRow: IBoardRow, coordinateClick: (y: number) => () => void}): JSX.Element => {
  return <div styleName="boardRow">{
    props.boardRow.map(
      (boardCell, columnIndex) => {
        return <BoardCell boardCell={boardCell} key={columnIndex} coordinateClick={props.coordinateClick(columnIndex)} />;
      }
    )
  }</div>;
});
