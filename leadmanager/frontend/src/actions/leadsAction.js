import axios from "axios";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

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
    .catch((err) => console.log(err)); // 基本上這裡也要有個errors reducer來傳送errors到component
};

// delete leads
// 新增參數id
export const deleteLead = (id) => (dispatch) => {
  axios
    .delete(`/api/leads/${id}/`)
    .then((res) => {
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
    .then((res) =>
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};