import {IBoardCell} from "./types";
import * as classNames from "classnames";

const empty = (click) => <div onClick={click} styleName="empty"/>;

const ship = (cell) => {
  return <div styleName="ship">{cell.enemy ? "V" : "^"}</div>;
};

export const BoardCell = CSSModules(styles)((props: {boardCell: IBoardCell, coordinateClick: () => void}) => {
  const cellStyle = classNames(styles.boardCell, {
    [styles.destroyed]: props.boardCell.destroyed
  });

  return <div className={cellStyle}>
    {
      (props.boardCell.ship) ? ship(props.boardCell) : empty(props.coordinateClick)
    }
  </div>;
});
