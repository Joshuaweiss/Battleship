import {IBoardCell} from "./types";

export const BoardCell = CSSModules(styles)((props: {boardCell: IBoardCell, coordinateClick: () => void}) => {
  return <div styleName="boardCell">
    {
      (props.boardCell.ship) ? <div styleName="ship">^</div> : <div onClick={props.coordinateClick} styleName="empty"/>
    }
  </div>;
});
