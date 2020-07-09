import { LOGOUT } from "../actions/index";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGOUT:
      if (action.payload.status === 200) {
          console.log('logout successful');
      } else {
            alert("There was trouble logging out. Please try again.")
            return {}
        }
    default:
      return state;
  }
}