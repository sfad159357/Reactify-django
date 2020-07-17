import { combineReducers } from "redux";
import leadsReducer from "./leadsReducer";
import errorsReducer from "./errorsReducer";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";

export default combineReducers({
  leadsReducer,
  errorsReducer,
  messagesReducer,
  authReducer,
});
