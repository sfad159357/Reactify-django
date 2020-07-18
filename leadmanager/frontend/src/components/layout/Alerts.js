import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidUpdate(previousProps) {
    const { error, alert, message, auth } = this.props;
    if (error !== previousProps.error) {
      if (error.msg.name) alert.error("請輸入姓名");
      if (error.msg.gender) alert.error("請輸入性別");
      if (error.msg.birth) alert.error("請輸入出生年月日");
      if (error.msg.mobile) alert.error("手機號碼請輸入10位整數數字");
      if (error.msg.email) alert.error("電子信箱已有人使用");
      if (error.msg.username) alert.error(error.msg.username);
      if (error.msg.password) {
        if (error.msg.password[0]) alert.error(error.msg.password[0]);
        if (error.msg.password[1]) alert.error(error.msg.password[1]);
        if (error.msg.password[2]) alert.error(error.msg.password[2]);
      }
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors);
    }

    if (message !== previousProps.message) {
      if (message.leadDeleted) alert.success("順利刪除");
      if (message.leadAdded) alert.success("順利新增");
      if (message.passwordNotMatch) alert.error("密碼不相符，請重新輸入");
    }

    if (auth !== previousProps.auth) {
      if (auth.user) alert.success(`Welcome ${auth.user.username}!`);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  error: state.errorsReducer,
  message: state.messagesReducer,
  auth: state.authReducer,
});

export default compose(withAlert(), connect(mapStateToProps))(Alerts);
