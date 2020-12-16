/**
 * create in 2020-05-11 by Aaron
 */
import "./polyfills.js";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const UI_ROOT_ID = "datav-ui-root";

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: import 'mock'
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  require("./__mocks__");
}

ReactDOM.render(<App />, document.getElementById(UI_ROOT_ID));
