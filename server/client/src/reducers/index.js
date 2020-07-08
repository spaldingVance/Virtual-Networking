import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import conversationsReducer from "./conversationsReducer";

const rootReducer = combineReducers({
  events: eventsReducer,
  conversations: conversationsReducer
});

export default rootReducer;
