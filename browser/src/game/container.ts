import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Game} from "./component";
import {submitShip, submitGuess} from "./actions";

const stateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators({submitShip, submitGuess}, dispatch),
});

export const GameContainer = connect(stateToProps, dispatchToProps)(Game);
