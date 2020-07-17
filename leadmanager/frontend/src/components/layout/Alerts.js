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
      if (error.msg.name) alert.error(`Name:${error.msg.name} `);
      if (error.msg.email) alert.error(`Email: ${error.msg.email}`);
      if (error.msg.message) alert.error(`Message: ${error.msg.message}`);
      if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors);
      if (error.msg.username) alert.error(error.msg.username);
      if (error.msg.password) {
        if (error.msg.password[0]) alert.error(error.msg.password[0]);
        if (error.msg.password[1]) alert.error(error.msg.password[1]);
        if (error.msg.password[2]) alert.error(error.msg.password[2]);
      }
    }

    if (message !== previousProps.message) {
      if (message.leadDeleted) alert.success(message.leadDeleted);
      if (message.leadAdded) alert.success(message.leadAdded);
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
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
