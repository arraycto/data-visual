import { combineReducers } from "redux";

import app from "./app";
import component from "./component";

const rootReducer = combineReducers({
  app,
  component
});

export default rootReducer;
