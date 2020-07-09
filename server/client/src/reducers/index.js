import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import setCurrentEvent from "./setCurrentEvent";
import conversationsReducer from "./conversationsReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  events: eventsReducer,
  conversations: conversationsReducer,
  user: loginReducer,
  currentEvent: setCurrentEvent,
});

export default rootReducer;
