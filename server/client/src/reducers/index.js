import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import setCurrentEvent from "./setCurrentEvent";
import conversationsReducer from "./conversationsReducer";
import loginReducer from "./loginReducer";
import joinConversationsReducer from "./joinConversationReducer";

const rootReducer = combineReducers({
  events: eventsReducer,
  event: conversationsReducer,
  user: loginReducer,
  currentConversations: joinConversationsReducer,
  currentEvent: setCurrentEvent,
});

export default rootReducer;
