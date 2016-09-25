import {boardCellI} from "./types";

@CSSModules(styles)
export class BoardCell extends React.Component<any, boardCellI> {
  render(): JSX.Element {
    return <div styleName="boardCell">
      {
        (this.props.ship) ? <div styleName="ship">^</div> : <div className="empty"/>
      }
    </div>;
  }
}
