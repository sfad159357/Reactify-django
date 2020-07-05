import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "", // double check
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, password2 } = this.state;
    const account = { username, email, password, password2 };
    this.props.registerAction(account);
    this.setState({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  onChange = (event) => {
    this.setState({
      // input name="xxx": 鍵入的值
      [event.target.name]: event.target.value,
    });
  };

  render() {
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

export default Register;
