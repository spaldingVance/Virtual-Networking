import { GET_CONVERSATIONS } from "../actions/index";

export default function (state = [], action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      console.log("Action payload for GET_CONVERSATIONS is", action.payload);
      return action.payload.data.conversations;
    default:
      return state;
  }
}
