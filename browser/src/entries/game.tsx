import * as React from "react";
import * as ReactDOM from "react-dom";

import * as _ from "lodash";

import * as CSSModules from "react-css-modules";

window["CSSModules"] = CSSModules;
window["React"] = React;

import {Provider} from "react-redux";
import {Board} from "../board/component";

import {createStore} from "redux";

export const store = createStore((a = {}) => a);

const testBoard = _.range(0, 5).map(() => _.range(0, 5).map(() => ({ship: true})));

ReactDOM.render(
  <Provider store={store}>
    <Board  board={testBoard} />
  </Provider>,
  document.getElementById('app')
);
