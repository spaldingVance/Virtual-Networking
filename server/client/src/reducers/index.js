import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import setCurrentEvent from "./setCurrentEvent";
import conversationsReducer from "./conversationsReducer";
import loginReducer from "./loginReducer";
import joinConversationsReducer from "./joinConversationReducer";
import logoutReducer from "./logoutReducer";

const rootReducer = combineReducers({
  events: eventsReducer,
  event: conversationsReducer,
  user: loginReducer,
  currentConversations: joinConversationsReducer,
  currentEvent: setCurrentEvent,
  logout: logoutReducer
});

export default rootReducer;
