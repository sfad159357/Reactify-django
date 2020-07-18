import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, deleteLead } from "../../actions/leadsAction";

export class Leads extends Component {
  static propTypes = {
    leadsProps: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLeads();
  }

  render() {
    return (
      <Fragment>
        <h2>員工資訊列表</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>員工編號</th>
              <th>姓名</th>
              <th>性別</th>
              <th>出生</th>
              <th>手機號碼</th>
              <th>電子信箱</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.leadsProps.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.gender}</td>
                <td>{lead.birth}</td>
                <td>{lead.mobile}</td>
                <td>{lead.email}</td>
                <td>
                  <button
                    onClick={this.props.deleteLead.bind(this, lead.id)}
                    className="btn btn-danger btn-smaller"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  leadsProps: state.leadsReducer.leadsState,
});

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
