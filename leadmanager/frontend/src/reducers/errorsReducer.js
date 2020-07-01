import { GET_ERRORS } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
};

// payload可以先讀作資訊
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        // action.payload === errors = {msg:err.res.data, status: err.res.status}
        msg: action.payload.msg,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
