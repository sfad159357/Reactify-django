import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const account = { username, password };
    // this.props.loadUser();
    this.setState({
      username: "",
      password: "",
    });
  };

  onChange = (event) => {
    this.setState({
      // input name="xxx": 鍵入的值
      [event.target.name]: event.target.value,
    });
  };

  render() {
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
                type="text"
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

export default Login;
