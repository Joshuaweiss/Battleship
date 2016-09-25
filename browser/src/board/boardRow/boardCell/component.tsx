import {boardCellI} from "./types";

export const BoardCell = CSSModules(styles)((props: {boardCell: boardCellI, coordinates: {x: number, y: number}}) => {
  return <div styleName="boardCell">
    {
      (props.boardCell.ship) ? <div styleName="ship">^</div> : <div className="empty"/>
    }
  </div>;
});
