import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
// 要透過component中redux來運作，就要使用到connect
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.alert.show("it Works");
  }

  // 一旦component中的props更新了，componentDidUpdate()就會被觸發
  // 這裡的props.error被更新，而觸發函式
  componentDidUpdate(previousProps) {
    const { error, alert, message } = this.props;
    if (error !== previousProps.error) {
      if (error.msg.name)
        // 如果Name輸入框沒輸入字元，error.msg.name就會呈現the field is not be blank，在if()內有string就是true
        // 如果是正常輸入沒有噴error，那error.msg.name而言，就是undefined，在if()而言就是false
        alert.error(`Name:${error.msg.name} `);
      if (error.msg.email) alert.error(`Email: ${error.msg.email}`);
      if (error.msg.message) alert.error(`Message: ${error.msg.message}`);
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors);
      if (error.msg.username) alert.error(error.msg.username);
    }
    // 當使用者登入時輸入不對的帳密，Redux會出現non_field_errors

    if (message !== previousProps.message) {
      if (message.leadDeleted) alert.success(message.leadDeleted);
      if (message.leadAdded) alert.success(message.leadAdded);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
    }
  }

  render() {
    return null;
  }
}

// 光是Redux中的state改變，是無法直接影響到component的，所以要將state.xxxReducer有變動的state掛在component的props
const mapStateToProps = (state) => ({
  error: state.errorsReducer,
  message: state.messagesReducer,
});

export default compose(withAlert(), connect(mapStateToProps))(Alerts); // withAlert()(Alerts是一個物件型態
// withAlert(Alerts)會噴error，應該是react-alert版本問題
