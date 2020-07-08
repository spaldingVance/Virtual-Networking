import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import conversationsReducer from "./conversationsReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  events: eventsReducer,
  conversations: conversationsReducer,
  user: loginReducer
});

export default rootReducer;
