import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import * as _ from "lodash";
import * as CSSModules from "react-css-modules";

window["CSSModules"] = CSSModules;
window["React"] = React;
window["_"] = _;

import {GameContainer} from "../game/container";
import {GameReducer} from "../game/reducer";

export const store = createStore(GameReducer);

document.addEventListener( 'DOMContentLoaded', function () {
  ReactDOM.render(
    <Provider store={store}>
      <GameContainer />
    </Provider>,
    document.getElementById('app')
  )
}, false );

