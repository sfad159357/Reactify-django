import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";
import store from "../store";
import { config } from "react-transition-group";

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

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // 如果login成功，db會提供token，這時可以將state設置token，前面是key，後面是value
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true, // login成功，代表會拿到當初跟register一樣的token，所以isAuthenticated = true
        isLoading: false,
      };

    // 由於LOGIN_FAIL和AUTH_ERROR所做的行為是一樣的，就擺在一起
    case AUTH_ERROR: // 在登入首頁時"/"，會去check localState中的token，若token不符合，就跳出AUTH_ERROR，然後將state進行重置。
    case LOGIN_FAIL: // 在LOGIN頁面按下login submit，要去check所驗證的username和password是否和db的data符合，若符合則給予token，若不符合跳出LOGIN_FAIL，state一樣重置
    case LOGOUT_SUCCESS: // 登出成功後，除了前端將localStorage內的token清除，server端也會將token給破壞掉。
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
