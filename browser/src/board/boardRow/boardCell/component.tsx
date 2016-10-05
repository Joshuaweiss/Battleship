import {IBoardCell} from "./types";

const empty = (click) => <div onClick={click} styleName="empty"/>;

const ship = (ship) => (
  <div styleName={ship.destroyed ? "destroyed" : ""}>
    <div styleName="ship">{ship.enemy ? "V" : "^"}</div>
  </div>
);

export const BoardCell = CSSModules(styles)((props: {boardCell: IBoardCell, coordinateClick: () => void}) => {
  return <div styleName="boardCell">
    {
      (props.boardCell.ship) ? ship(props.boardCell) : empty(props.coordinateClick)
    }
  </div>;
});
