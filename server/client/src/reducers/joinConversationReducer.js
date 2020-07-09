import { JOIN_CONVERSATION } from "../actions/index";

export default function (state = [], action) {
  switch (action.type) {
    case JOIN_CONVERSATION:
      console.log("Action payload for JOIN_CONVERSATIONS is", action.payload);
     return [action.payload, ...state];
    default:
      return state;
  }
}