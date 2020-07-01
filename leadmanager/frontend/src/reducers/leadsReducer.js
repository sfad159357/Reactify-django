import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types.js";

// state的初始狀態，要宣告state={}裡面有哪些key，之後帶入的值才可以有個key配對
const initialState = {
  leadsState: [],
  // 後端其他app的state，是個總state
  otherState: [
    { id: 123, name: "qwe", email: "456@aaa.com", message: "我好帥" },
  ],
};

// 如果帶入的參數state沒有值，就默認是initialState
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        //   雖然初始state原有leadsState，但值沒有再重複[...state.leadsState]，就會被action.payload覆蓋掉
        leadsState: action.payload, // response.data
      };
    case DELETE_LEAD:
      return {
        ...state,
        leadsState: state.leadsState.filter(
          (lead) => lead.id !== action.payload // action.payload: id
        ),
      };
    case ADD_LEAD:
      return {
        //   初始的state
        ...state,
        // 將原本的leadsState保留住，另外再加上action中的data，而action.payload本身就是一個lead，{}物件型態
        leadsState: [...state.leadsState, action.payload],
      };
    default:
      return state;
  }
}
