import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types.js";

const initialState = {
  leadsState: [{ id: 0, name: "asd", email: "777@aaa.com", message: "3ed" }], // 我們重後端取得的data，我們想放到state裡
  something: [
    { id: 123, name: "qwe", email: "456@aaa.com", message: "我好帥" },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        //   雖然初始state原有leadsState，但在leadsState只會留下action中的data
        leadsState: action.payload,
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
