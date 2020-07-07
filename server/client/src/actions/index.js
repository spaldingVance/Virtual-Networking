import axios from "axios";
const ROOT_URL = `http://localhost:5000`;

export const GET_EVENTS = "GET_EVENTS";
export const SELECT_EVENT = "SELECT_EVENT";

export function getEvents() {
  const url = `${ROOT_URL}/events`;
  const request = axios.get(url);

  request.then(console.log("hi"));

  return {
    type: GET_EVENTS,
    payload: request,
  };
}

export function selectEvent() {
  const url = `${ROOT_URL}/events`;
  const request = axios.get(url);

  return {
    type: GET_EVENTS,
    payload: request,
  };
}
