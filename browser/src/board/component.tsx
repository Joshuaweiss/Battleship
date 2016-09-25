import {BoardRow} from "./boardRow/component";
import {boardRowI} from "./boardRow/types";

@CSSModules(styles)
export class Board extends React.Component<any, {board: boardRowI[]}>{

  render(): JSX.Element {
    return <div styleName="board">
      {this.props.board.map((boardRow, rowIndex) => <BoardRow cells={boardRow} rowIndex={rowIndex} key={rowIndex} />)}
    </div>;
  }

}
