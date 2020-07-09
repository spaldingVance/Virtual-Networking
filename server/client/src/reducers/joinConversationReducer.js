import { JOIN_CONVERSATION, LEAVE_ALL_CONVERSATIONS } from "../actions/index";

export default function (state = [], action) {
  switch (action.type) {
    case JOIN_CONVERSATION:
      console.log("Action payload for JOIN_CONVERSATIONS is", action.payload);
      return [action.payload, ...state];
    case LEAVE_ALL_CONVERSATIONS:
      return action.payload;
    default:
      return state;
  }
}
