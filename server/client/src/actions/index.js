import axios from "axios";

export const GET_EVENTS = "GET_EVENTS";
export const SET_CURRENT_EVENT = "SET_CURRENT_EVENT";
export const GET_CONVERSATIONS = "GET_CONVERSATIONS";
export const LOGIN = "LOGIN";

export function getEvents() {
  const url = `/events`;
  const request = axios.get(url);

  request.then(console.log("hi!!!"));

  return {
    type: GET_EVENTS,
    payload: request,
  };
}

export function setCurrentEvent(id) {
  return {
    type: SET_CURRENT_EVENT,
    payload: id,
  };
}

export function getConversations(currentEvent) {
  // hard coding convo ID for testing
  const url = `/events/${currentEvent}`;
  const request = axios.get(url);

  request.then(console.log(`Conversations requested for ${currentEvent}`));

  return {
    type: GET_CONVERSATIONS,
    payload: request,
  };
}

export function login(eventID, userName, role) {
  const url = `/users/${eventID}`;
  const request = axios({
    method: "post",
    url: url,
    data: {
      userName: userName,
      role: role,
    },
  });

  request.then(console.log("login attempted"));

  return {
    type: LOGIN,
    payload: request,
  };
}
