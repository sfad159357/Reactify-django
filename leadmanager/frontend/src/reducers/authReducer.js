import { USER_LOADING, USER_LOADED, AUTH_ERROR } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  // 一旦登入或載入User，將會轉變成true，然後token會被存放在local storage
  isAuthenticated: null,
  // login後會發送出loading action，載入到User之後，產生request後得到response，在這之間isLoading:True
  isLoading: false,
  // 從response的data得到的user
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticate: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
