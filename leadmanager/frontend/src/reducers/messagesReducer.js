import { CREATE_MESSAGE } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    // leadsAction的delete被觸發後，也會dispatch(createMessage({xxx}))，裡面所回傳的就是
    // {type:CREATE_MESSAGE, payload:msg} msg = {xxx}
    case CREATE_MESSAGE:
      return (state = action.payload); // 觸發set state
    default:
      return state;
  }
}
