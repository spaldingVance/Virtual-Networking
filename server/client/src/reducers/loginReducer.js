import { LOGIN } from "../actions/index";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
      if (action.payload.status === 200) {
          return action.payload.data;
      } else {
            alert("username already taken")
            return {}
        }
    default:
      return state;
  }
}