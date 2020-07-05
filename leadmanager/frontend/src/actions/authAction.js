import axios from "axios";
import { returnErrors } from "./messagesAction";
import { USER_LOADED, USER_LOADING, AUTH_ERROR } from "./types";

// check token & load user
// 如果流程都順利走完，isAuthenticated就會轉成true

// 參2新增getState，讓我們可以從state取得token
export const loadUser = () => (dispatch, getState) => {
  // set User Loading
  dispatch({ type: USER_LOADING }); // 這個動作會在產生request之前，使isLoading轉true

  // get the token from the state
  const token = getState().authReducer.token;

  // send something to headers with our request
  const config = {
    headers: {
      "Content-Type": "application-json",
    },
  };

  // If there is a token, add 'Authorization' to headers config
  // 這像是postman操作一樣，因為要get或post都需要authenticate，才能進入內部頁面進行存取
  // 在執行HTTP方法前，必須要在Headers底下的key輸入Authorization，其value值輸入Token "金鑰密碼"
  if (token) config.headers["Authorization"] = `Token ${token}`;

  // 從後端server的api撈user可get的data，而要帶入Headers所需要的config
  axios
    .get("/api/auth/user", config)
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
};

// 以上的流程可以讓我們去做出request(HTTP method)來去載入User
