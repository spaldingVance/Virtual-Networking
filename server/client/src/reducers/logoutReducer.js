import { LOGOUT } from "../actions/index";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGOUT:
      if (action.payload.status === 200) {
          console.log("logout successful");
          return {logout: true}
      } else {
            alert("There was a problem logging out. Please try again")
            return {}
        }
    default:
      return state;
  }
}