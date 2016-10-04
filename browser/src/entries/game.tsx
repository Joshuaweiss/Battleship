import 'whatwg-fetch';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import * as _ from "lodash";
import * as CSSModules from "react-css-modules";

window["CSSModules"] = CSSModules;
window["React"] = React;
window["_"] = _;

import {GameContainer} from "../game/container";
import {GameReducer} from "../game/reducer";
import {getGame} from "../game/actions";

export const store = createStore(
  GameReducer,
  applyMiddleware(thunk)
);

document.addEventListener( 'DOMContentLoaded', function () {
  ReactDOM.render(
    <Provider store={store}>
      <GameContainer />
    </Provider>,
    document.getElementById('app')
  )

  store.dispatch(getGame());
}, false );

