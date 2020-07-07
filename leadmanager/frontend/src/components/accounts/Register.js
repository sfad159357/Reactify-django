import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/authAction";
import PropTypes from "prop-types";
import { createMessage } from "../../actions/messagesAction";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "", // double check
  };

  static propTypes = {
    isAuthenticatedProp: PropTypes.bool,
    register: PropTypes.func.isRequired,
  };

  onSubmit = (event) => {
    event.preventDefault();
    // 這裡check密碼是否相同，若不相同製造訊息出來，訊息是以物件形式呈現
    // 這是我們在輸入框輸入的值
    const { username, email, password, password2 } = this.state;
    if (password !== password2)
      this.props.createMessage({
        passwordNotMatch: "password do not match",
      });
    else this.props.register(username, password, email);
  };

  onChange = (event) => {
    this.setState({
      // input name="xxx": 鍵入的值
      [event.target.name]: event.target.value,
    });
  };

  render() {
    if (this.props.isAuthenticatedProp) return <Redirect to="/" />;
    const { username, email, password, password2 } = this.state;
    return (
      <div className="col-md-6 mu-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="form-group">
              <label>Comfirm Password</label>
              <input
                type="text"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticatedProp: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
