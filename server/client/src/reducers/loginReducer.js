import { LOGIN } from "../actions/index";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      console.log("Action payload for LOGIN is", action.payload);
      return action.payload;
    default:
      return state;
  }
}