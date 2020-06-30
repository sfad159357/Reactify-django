// 調用模組
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/indexReducer";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer, // 會回傳一個物件，然後被傳送到react-redux Provider的component，會渲染在component tree的top
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
