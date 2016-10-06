import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Game} from "./component";
import {submitShip, submitGuess, newGame} from "./actions";

const stateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({
  actions: bindActionCreators({submitShip, submitGuess, newGame}, dispatch),
});

export const GameContainer = connect(stateToProps, dispatchToProps)(Game);
