import React, { Component, Fragment } from "react";
import { connect } from "react-redux"; // 為了要在redux內處理任何component，需要使用到connect
import PropTypes from "prop-types"; // 增加Leads此component屬性props
import { getLeads, deleteLead } from "../../actions/leadsAction"; // 當component mounts的時候，需要呼叫getLeads，會發送物件到leadsReducer做增減state物件內狀態，最後回傳component作為其props屬性

export class Leads extends Component {
  static propTypes = {
    // static表示Leads類別不需成為呼間也能呼叫之屬性
    // 就算沒有新增props types，還是可以呼叫this.props.xxx，這只是個一種習慣
    leadsProps: PropTypes.array.isRequired, // leadsState物件是以[]陣列方式進行儲存，而非{}，裡面會以[{},{},...]此種方式儲存。原始state={ xxx:[],yyy:[],...}方式儲存
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired,
  };

  // 當Leads component生命週期到了component時，就會呼叫Leads的props的方法
  componentDidMount() {
    this.props.getLeads();
  }

  render() {
    return (
      <Fragment>
        <h2>Lead List</h2>
        <table className="table table-striped">
          {/* table head:thead */}
          <thead>
            {/* table row:tr */}
            <tr>
              {/* table heading: th */}
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th />
            </tr>
          </thead>
          {/* table body: tbody */}
          <tbody>
            {this.props.leadsProps.map((lead) => (
              // 這裡的key是系統要看的
              <tr key={lead.id}>
                {/* table data:td */}
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td>
                  <button
                    onClick={this.props.deleteLead.bind(this, lead.id)}
                    // 按下刪除按鈕，透過呼叫Leads的props屬性之deleteLead方法，用bind()來作為輸入的參數，但是this必須為第一個參數
                    // 按下按鈕後，就會執行deleteLead方法，但是當前主要負責的是傳送id到leadsAction，才會透過得到的id啟動axios delete方法在api真正刪除後台的data
                    // 刪除完發送action的type和payload，改變leadsState，使前端頁面的組件有所改變
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

// 目前不知道leadsStateReducer怎麼import來的
const mapStateToProps = (state) => ({
  leadsProps: state.leadsReducer.leadsState,
});
// ()直接回傳裡頭的物件{leadsProps: VALUE}

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
// 不僅需要connect Leads組件，也需要得到他的state，這需要能夠去呼叫get leads方法，透過mapStateToProps將state此狀態之物件，轉換成Leads組件之props內的屬性
// 所以也需要在connect後面加上常數mapStateToProps，此常數的值就是leadsProps

// 我猜想這裡的{ getLeads }還是被{}包裹住，應該是Leads.js當前階段目前還沒有要呼叫getLeads()
// 只是先透過connect綁在Leads組件上，被調用到Dashboard組合，再被調用到App.js組合，Provider中的store裡頭有rootReducer，裡頭有leadsReducer可以被呼叫然後回傳新的state
// 此時等到componentDidMount時，會呼叫Leads組件中屬性的getLeads()方法，就可以透過api取得後端的data，然後發送data之物件
