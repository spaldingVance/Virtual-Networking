import { GET_EVENTS } from "../actions/index";

export default function (state = [], action) {
  switch (action.type) {
    case GET_EVENTS:
      console.log(action.payload);
      return [action.payload.data];
    default:
      return state;
  }
}
