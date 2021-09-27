//reduce code complexity in store. so include reducing code here
//combine reducers

import toDoReducer from "./toDo.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toDoItems: toDoReducer,
});

export default rootReducer;
