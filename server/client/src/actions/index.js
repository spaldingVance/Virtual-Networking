import axios from "axios";

const ROOT_URL = `http://localhost:5000`;

//const ROOT_URL = ``

export const GET_EVENTS = "GET_EVENTS";
export const SET_CURRENT_EVENT = "SET_CURRENT_EVENT";
export const GET_CONVERSATIONS = "GET_CONVERSATIONS";
export const LOGIN = "LOGIN";

export function getEvents() {
  const url = `${ROOT_URL}/events`;
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

export function getConversations() {
  // hard coding convo ID for testing
  const url = `${ROOT_URL}/events/5f0517a09e543554fcb133e4`;
  const request = axios.get(url);

  request.then(console.log("conversations retrieved"));

  return {
    type: GET_CONVERSATIONS,
    payload: request,
  };
}

export function login(eventID, userName, role) {
  const url = `${ROOT_URL}/users/${eventID}`;
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
