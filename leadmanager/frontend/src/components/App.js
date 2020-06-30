import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";

// redux負責整合這兩者
import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* 將store此常數儲存為props */}
        <Fragment>
          <Header />
          <div className="container">
            <Dashboard />
          </div>
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app")); // main app
