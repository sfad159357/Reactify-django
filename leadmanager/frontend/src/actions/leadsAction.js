import axios from "axios";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";
import { createMessage, returnErrors } from "./messagesAction";

// get leads
export const getLeads = () => (dispatch) => {
  axios
    .get("/api/leads/") // 製造HTTP GET請求
    .then((res) => {
      // 會回傳promise回來，會回傳res的參數
      dispatch({
        // 我們要發送一個物件，也就是get leads action這動作到reducer處理
        type: GET_LEADS, // 我們想要傳送此action的type種類到leadsReducer，啟動函式的swith case
        payload: res.data, // 從server回應回來的data，也是和type一樣，將response回來的data儲存在action中payload傳送到leadsReducer的函式內
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  // 基本上這裡也要有個errors reducer來傳送errors到component
};

// delete leads
// 新增參數id
export const deleteLead = (id) => (dispatch) => {
  axios
    .delete(`/api/leads/${id}/`)
    .then((res) => {
      // 如果只有一個dispatch()但發送不同兩個物件的話，會只發送第一個，所以這裡要重複兩次dispatch
      dispatch(createMessage({ leadDeleted: "Lead Deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id, // 反饋回來的只有id了
      });
    })
    .catch((err) => console.log(err));
};

// add lead
// 新增參數lead物件
export const addLead = (lead) => (dispatch) => {
  axios
    .post("/api/leads/", lead) // 這裏參2要帶入lead物件，就好像在postman要輸入物件key和value一樣
    .then((res) => {
      // 若不是error，就會成功回應response
      dispatch(createMessage({ leadAdded: "Lead Added" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch(
      (err) =>
        // 這個方法2跟上面createMessage({msg})一樣，輸入想要的參數就好
        dispatch(returnErrors(err.response.data, error.response.status))

      // 方法一換掉，我們直接另外在messagesAction設函式，取代下面的code
      // const errors = {
      //   // 儲存在常數errors物件裡頭有message和status
      //   msg: err.response.data, // msg示意物件形式儲存，{name:["xxx"], email:["yyy"]}
      //   status: err.response.status,
      // };
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: errors, // 發送到errorReducer，action.payload就是errors我們所定義的物件
      // });
    );
};
