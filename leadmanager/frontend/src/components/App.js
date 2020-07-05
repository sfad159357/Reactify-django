import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";

// redux負責整合這兩者
import { Provider } from "react-redux";
import store from "../store";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./layout/Alerts";

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Register from "./accounts/Register";
import Login from "./accounts/Login";
import PrivateRoute from "./common/PrivateRoute";
import { loadUser } from "../actions/authAction";

// Alert Options
const alertOptions = {
  timeout: 5000,
  position: "top center",
};

class App extends Component {
  // 在一進入首頁就會被呼叫loadUser，一開始action一定有USER_LOADING
  // 如果沒token，接連GET_ERROR和AUTH_ERROR
  // 如果有token，出現USEE_LOADED，然後得到User物件
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <HashRouter>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                {/* 這裡將<Dashboard / >改變寫法，使component成為Route的props，然後將其儲存於其中 */}
                <Switch>
                  {/* Dashboard要讓還未授權的user被隱藏，使用PrivateRoute */}
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </HashRouter>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
// main app
