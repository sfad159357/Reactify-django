// 自己是route reducer，收集各個reducer
import { combineReducers } from "redux";
import leadsReducer from "./leadsReducer";
import errorsReducer from "./errorsReducer";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";

// 可以合併其他reducer增減器
// 合併後在redux的State就能夠看到
export default combineReducers({
  leadsReducer,
  errorsReducer,
  messagesReducer,
  authReducer,
});
