import axios from "axios";
import { returnErrors } from "./messagesAction";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// check token & load user
// 如果流程都順利走完，isAuthenticated就會轉成true

// 將headers要帶入的參數包在tokenConfig
export const tokenConfig = (getState) => {
  // get the token from the state
  const token = getState().authReducer.token;

  // send something to headers with our request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If there is a token, add 'Authorization' to headers config
  // 這像是postman操作一樣，因為要get或post都需要authenticate，才能進入內部頁面進行存取
  // 在執行HTTP方法前，必須要在Headers底下的key輸入Authorization，其value值輸入Token "金鑰密碼"
  if (token) config.headers["Authorization"] = `Token ${token}`;
  // 從後端server的api撈user可get的data，而要帶入Headers所需要的config
  return config;
};

// 參2新增getState，讓我們可以從state取得token
export const loadUser = () => (dispatch, getState) => {
  // set User Loading
  dispatch({ type: USER_LOADING }); // 這個動作會在產生request之前，使isLoading轉true

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      // 順利取得otken認證後得到的respone
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      // 會有err表示沒有取得token，所以並沒有認證過
      // 我們先將err參數將過函式轉成有效物件，然後發送到errorsReducer處理，最後存放到state裡
      dispatch(returnErrors(err.response.data, err.response.status));
      // 而我們也想將這AUTH_ERROR由authReducer處理，因為我們想要更新authReducer中的state(原始狀態)
      dispatch({
        type: AUTH_ERROR,
      });
    });
}; // 以上的流程可以讓我們去做出request(HTTP method)來去載入User

// Login User
// 此函式不會去check toekn，因為login user是要去取得token，所以就不有getState函式
// 因為要login，要帶入參數username, password
export const login = (username, password) => (dispatch) => {
  // send something to headers with our request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  // 前端提交數據到後台，必須將JSON格式給字串化，後台才看得懂，不然會被丟出400 bad request
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// logout user
// 因為需要token知道是哪位user登出，這邊可以複製loadUser()的code
export const logout = () => (dispatch, getState) => {
  // 用不到isLoading

  axios
    // 雖然是登出不用輸入body(物件)，但一樣是做post，參2要輸入null，表示body=null
    .post("/api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Register User
export const register = (username, password, email) => (dispatch) => {
  // send something to headers with our request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  // 前端提交數據到後台，必須將JSON格式給字串化，後台才看得懂，不然會被丟出400 bad request
  const body = JSON.stringify({ username, password, email });

  axios
    .post("/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
