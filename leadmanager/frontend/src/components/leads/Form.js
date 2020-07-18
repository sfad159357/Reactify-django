import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leadsAction";

export class Form extends Component {
  state = {
    name: "",
    gender: "",
    birth: "",
    mobile: "",
    email: "",
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  onChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });

  onSubmit = (event) => {
    event.preventDefault();
    const { name, gender, birth, mobile, email } = this.state;
    const lead = { name, gender, birth, mobile, email };
    this.props.addLead(lead);
    this.setState({
      name: "",
      gender: "",
      birth: "",
      mobile: "",
      email: "",
    });
  };

  render() {
    const { name, gender, birth, mobile, email } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>新增員工表單</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>姓名</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>

          <div className="form-group">
            <label>性別</label>
            <select
              className="form-control"
              name="gender"
              onChange={this.onChange}
              value={gender}
            >
              <option value="">--</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>

          <div className="form-group">
            <label>出生日期</label>
            <input
              className="form-control"
              type="date"
              max="9999-12-31"
              name="birth"
              onChange={this.onChange}
              value={birth}
            />
          </div>
          <div className="form-group">
            <label>手機號碼</label>
            <input
              className="form-control"
              type="text"
              name="mobile"
              onChange={this.onChange}
              value={mobile}
            />
          </div>
          <div className="form-group">
            <label>電子信箱</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
