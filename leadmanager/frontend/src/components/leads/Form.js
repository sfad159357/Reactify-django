import React, { Component } from "react";
// 這裡要將在前端頁面輸入值submit後，進而改變的state，要連結到redux，所以要調用connect
import { connect } from "react-redux";
import PropTypes from "prop-types"; // impt + tab 快捷鍵
import { addLead } from "../../actions/leadsAction";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  // 定義onChange方法
  onChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });
  // 如果沒有onChange，我們不能直接輸入字元
  // 我們正在輸入的字元(尚未submit)就是event.target.value值，而會以物件的形式被儲存在[event.target.name]這個key
  // state物件就被建立，有key，有value

  // 當按下按鈕，我們需要呼叫action，叫add lead，所以要做post request到server，然後發送一個action到reducer，才會會傳至底下component前端組件
  // 所以redux的好處就是，可以共享state，我們可以在同個前端頁面，在form表格輸入想要post的內容，submit之後，能夠在底下component組件get到後台server的data，也可以直接操作delete
  onSubmit = (event) => {
    event.preventDefault();
    const { name, email, message } = this.state; // 等效於name = this.state.name; {email} = this.state.email
    const lead = { name, email, message }; // {name, email, message}等效於{name: name, email:email, message:message}，就會形成我們所要lead的物件
    this.props.addLead(lead); // 啟動addLead方法，輸入所創建好lead物件作為參數
  };

  // 邏輯：有form輸入框->設定onChange->能夠在框內輸入字元->觸發onChange定義的this.onChange方法->創造state物件儲存key和value->input內的值是來自於state內的value
  // -> 按下type="submit"按鈕觸發onSubmit -> 連結this.onSubmit方法->儲存state中的變數->創建lead物件->呼叫addLead方法並帶入參數lead

  render() {
    //   value的變數，作為動態連結，value-{name}當中的name便樹叢state而來
    const { name, email, message } = this.state;

    return (
      // mt: margin top; mb: margin bottom
      <div className="card card-body mt-4 mb-4">
        <h2>Add Lead Form</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              // 當我們在輸入框內輸入任何字時，會啟動onChange
              //  如果沒有onChange就不能再輸入框輸入任何字元
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div>
          {/* Submit按扭設定紅底白字 */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

// 對於Leads component，我們需要map state to props，因為我們有帶入到state，而這state有帶入到Leads中
// 而對於Form component，我們單只有submit來呼叫addLead的action，而不需要將state帶入到Form組件中，因為Form不需要改變呈現
// 所以對於Form component，不需要使用map state to props，所以不需要connect，但connect第一個()還是要輸入參數，所以以null來取代
// 但是在第一個()內還是要連結action，也就是addLead
export default connect(null, { addLead })(Form);
