import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// create messages
// 這裡就直接回傳，不會做任何透過axios進行異步請求，不需要去傳送dispatch，這裡就直接回傳type和payload
export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg, // msg是一個物件{}
  };
};

// return error
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};
