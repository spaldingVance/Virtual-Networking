import { LOGIN } from "../actions/index";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN:
        console.log(`payload for LOGIN is ${action.payload}`)
      if (action.payload.status === 200) { 
          console.log("it's doing what it's supposed to")
          return action.payload.data;
      } else {
            return {}
        }
    default:
      return state;
  }
}