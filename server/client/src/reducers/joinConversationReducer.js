import { JOIN_CONVERSATION, LEAVE_ALL_CONVERSATIONS, LEAVE_ONE_CONVERSATION } from "../actions/index";

export default function (state = [], action) {
  switch (action.type) {
    case JOIN_CONVERSATION:
      console.log("Action payload for JOIN_CONVERSATIONS is", action.payload);
      return [action.payload, ...state];

    case LEAVE_ALL_CONVERSATIONS:
      return action.payload;

    case LEAVE_ONE_CONVERSATION:
    console.log('Inside LEAVE_ONE_CONVERSATION reducer, action.payload= ', action.payload)
    console.log('Inside LEAVE_ONE_CONVERSATION reducer, state= ', state)
      
    const index = state.findIndex(conversation => conversation._id === action.payload);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]

    default:
      return state;
  }
}
