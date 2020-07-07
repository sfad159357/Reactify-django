// rec + tab 快捷生成
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
import { logout } from "../../actions/authAction";

export class Header extends Component {
  static propTypes = {
    authProp: PropsTypes.object.isRequired,
    logout: PropsTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.authProp;
    // 登入後的link，改成logout botton
    const authLink = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        {/* 新增登入成功的訊息 */}
        <span className="nav-bar mr-3">
          {/* 明明user在登入後都會存在，為何還要用條件式來判斷是否存在？ */}
          {/* 因為需要先check user是存在的，才能夠執行statement，主要是因為不這樣做會跳出error，系統會認為user是null */}
          <strong>{user ? `Welcome ${user.username}` : ""}</strong>
        </span>
        <li className="nav-item">
          <button
            onClick={this.props.logout} // 在{}內的方法不用()，直接呼叫
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    // 將nav-bar中的register和login移到這裡面來
    const guestLink = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        {/* 將navbar包在container，頁面左右延伸，也會跟著延伸*/}
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Lead Manager
            </a>
          </div>
          {/* 透過條件式來呈現authLink還guestLink */}
          {isAuthenticated ? authLink : guestLink}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  authProp: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Header);
