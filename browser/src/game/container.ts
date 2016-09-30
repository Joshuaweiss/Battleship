import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Game} from "./component";
import {addShip} from "../gameState/reducer";

const stateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators({addShip}, dispatch),
});

export const GameContainer = connect(stateToProps, dispatchToProps)(Game);
