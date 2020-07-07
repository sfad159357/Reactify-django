import React, { Component } from "react";
// Link是client按了才能夠觸發轉到別的component，Redirect是code的條件達到就會被觸發跳轉到別的component
import { Link, Redirect } from "react-router-dom";
// 為了要intetact with redux，所以調用connect，因為牽涉到state的改變
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
    // const { username, password } = this.state;
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (event) => {
    this.setState({
      // input name="xxx": 鍵入的值
      [event.target.name]: event.target.value,
    });
  };

  render() {
    // render()這個函式是持續進行的，只要這個login component的props改變，就會被觸發行為
    // 一旦login進去了，由於isAuthenticated是true，回傳就是跳轉到"/"，無法再按Login和Register連結跳轉離開
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

// 要轉化成props的state，我們只需要state中的authReducer中的isAuthenticated，透過這個特定的state，我們可以用來判斷使用者是否成功login
const mapStateToProps = (state) => ({
  isAuthenticatedProp: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
