import * as React from "react";
import * as ReactDOM from "react-dom";

import {Provider} from "react-redux";
import {Board} from "../board/component";

import {createStore} from "redux";

export const store = createStore((a = {}) => a);

ReactDOM.render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById('app')
);
