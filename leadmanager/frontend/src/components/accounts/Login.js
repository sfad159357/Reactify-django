import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropsTypes from "prop-types";
import { login } from "../../actions/authAction";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    login: PropsTypes.func.isRequired,
    isAuthenticatedProp: PropsTypes.bool,
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.login(this.state.username, this.state.password);
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    if (this.props.isAuthenticatedProp) return <Redirect to="/" />;
    const { username, password } = this.state;
    return (
      <div className="col-md-6 mu-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
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
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <p>
                Don't have a account?<Link to="/regiser">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticatedProp: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
