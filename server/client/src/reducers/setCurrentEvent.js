import { SET_CURRENT_EVENT } from "../actions/index";

export default function (state = "", action) {
  switch (action.type) {
    case SET_CURRENT_EVENT:
      return action.payload;
    default:
      return state;
  }
}
