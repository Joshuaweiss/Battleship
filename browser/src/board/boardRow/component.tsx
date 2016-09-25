import {boardRowI} from "./types";
import {BoardCell} from "./boardCell/component";

const boardCell = (rowIndex) => (boardCell, columnIndex) => <BoardCell {...boardCell} key={columnIndex} coordinates={[columnIndex, rowIndex]} />;

@CSSModules(styles)
export class BoardRow extends React.Component<any, boardRowI> {
  render(): JSX.Element {
    return <div styleName="boardRow">{ this.props.cells.map(boardCell(this.props.rowIndex)) }</div>;
  }
}
