import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// 如果也有component想被隱藏，就可以使用PrivateRoute
const PrivateRoute = ({ component: Component, authReducer, ...rest }) => (
  <Route
    {...rest} // 帶入任何rest的props或參數
    render={(props) => {
      // 假如狀態loading介於發出load的event和得到request回應response之間
      if (authReducer.isLoading) return <h2>Loading...</h2>;
      // 假如使用者還未授權，被重新導向/login
      else if (!authReducer.isAuthenticated) return <Redirect to="/login" />;
      // 假如排除以上兩者，頁面導入Dashboard組件
      else return <Component {...props} />;
    }}
  />
); // 渲染props=回傳值Dashboard component，其附帶的props

const mapStateToProps = (state) => ({ authReducer: state.authReducer });

export default connect(mapStateToProps)(PrivateRoute);
