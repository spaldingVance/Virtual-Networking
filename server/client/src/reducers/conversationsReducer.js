import { GET_CONVERSATIONS } from "../actions/index";

export default function (state = [], action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      console.log("Action payload for GET_CONVERSATIONS is", action.payload);
      if (action.payload.data) {
        return action.payload.data.conversations;
      } else {
        return state;
      }
    default:
      return state;
  }
}
