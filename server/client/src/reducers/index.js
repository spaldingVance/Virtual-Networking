import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import conversationsReducer from "./conversationsReducer";
import loginReducer from "./loginReducer";
import joinConversationsReducer from './joinConversationReducer'

const rootReducer = combineReducers({
  events: eventsReducer,
  conversations: conversationsReducer,
  user: loginReducer,
  currentConversations: joinConversationsReducer
});

export default rootReducer;
