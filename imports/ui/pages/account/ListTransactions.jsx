import React, {Component, PropTypes} from 'react';

import { createContainer } from 'meteor/react-meteor-data';
var createFragment = require('react-addons-create-fragment');

import CircularProgress from 'material-ui/CircularProgress'
import baseTheme        from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import Sidebar          from '../../shared/Sidebar.jsx';
import PaginationBar    from '../../components/PaginationBar.jsx';

import { Payments } from '../../../api/payment/payments.js';
import { Settings } from '../../../api/admin/settings/settings.js';
import { sendHomestayBooking } from '../../../api/homestays/methods.js';

import { updateStatus } from '../../../api/booking/methods.js';



export default class ListTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success:'',
      currentPage : 1,
      skip: ''
    };
    console.log(this.props.settings)
  }
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentDidMount() {
    Session.set('order-filter',null)
    if (FlowRouter.getQueryParam('page')) {
      this.setState({'currentPage' : Number(FlowRouter.getQueryParam('page'))} )
    }
  }

  renderOrder () {
    if (this.props.TransactionLoading && this.props.transactionCount == 0) {
        return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
    } else {
      console.log(this.props.settings)
      if(this.props.transactionCount > 0) {
        return (
          <div>
           <TransactionList data={this.props.transactions} canChangeStatus={this.props.canChangeStatus} settings={this.props.settings}/>
           <PaginationBar currentPage={this.state.currentPage} totalCount={this.props.transactionCount} />
          </div>
        )
      } else {
        return (
          <div className="col-sm-12">
             <h5> Seems that there is no transactions right now!..</h5>
          </div>
        )
      }
    }
  }

  render() {
    return (
       <section className="dashboard-content-wrapper">
       <aside className="left-side-bar">
        <ul>
          <li><a  href="/account/orders"><i className="icon-homestay" />Bookings</a></li>
          <li><a className="active" href="#"><i className="icon-schools" />Transactions</a></li>
          </ul>

      </aside>
        <aside className="right-side-wrapper">
          <div className="dashboard-content">
            {/*<OrderFilter />*/}
            {this.renderOrder()}
          </div>
        </aside>
      </section>
    );
  }
};
ListTransactions.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
ListTransactions.propTypes = {
    transactions: PropTypes.array.isRequired,
    transactionCount: PropTypes.number.isRequired
};

export default createContainer(() => {

    const TransactionHandle = Meteor.subscribe('all-payments', 5, FlowRouter.getQueryParam('page'),{});
    const SettingsHandle = Meteor.subscribe('settings');
    console.log(SettingsHandle.ready())
    console.log(Settings.find({}).fetch()[0])
    return {
        canChangeStatus : Roles.userIsInRole(Meteor.userId(), ['Accounting']),
        currentUser           : Meteor.user(),
        TransactionLoading    : !TransactionHandle.ready() && !SettingsHandle.ready(),
        transactions          : Payments.find({},{sort:{'createdAt':-1},limit: 5}).fetch(),
        transactionCount      : Counts.get('transaction-count'),
        settings              : Settings.find({}).fetch()[0]
    }
}, ListTransactions);

export class TransactionList extends Component {
  render() {
    let self=this,
        startIndex = 0;
    if(FlowRouter.getQueryParam('page')) {
      startIndex = (Number(FlowRouter.getQueryParam('page'))-1)*5;
    }
    var transactionNodes = this.props.data.map(function (transaction, index) {
      startIndex=startIndex+1;
      return (
        <Transaction key={transaction._id} settings={self.props.settings} transaction={transaction} index={startIndex} canChangeStatus={self.props.canChangeStatus}/>
      )
    });

    return(
      <table className="table db-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction ID</th>
            <th>Order ID</th>
            <th>Order Status</th>
            <th>Total Amount</th>
            <th>islBooking Amount</th>
            <th>Host Amount</th>
            <th>Payment Status </th>
            <th>Confirm Payment</th>
          </tr>
        </thead>
        <tbody>
         {transactionNodes}
        </tbody>
      </table>
    );
  }
};

export class Transaction extends Component {
  changeStatus(status,event){
    let data ={}
    data['status']        = status
    data['_id']           = this.props.transaction._id
    let pre_homestayName  = this.props.transaction.homestay().name
   
  }
 
  render() {
    console.log(this.props.transaction)
    console.log(this.props.transaction.booking())
    let siteCommision = ""
    let hostAmount = ""
    if(this.props.settings) {
      let commision = "";
      if(this.props.transaction.booking().bookingType == "dayBooking") {
        commision = (this.props.transaction.paymentAmount * this.props.settings.commission_amount)/100;
      } else {
        commision = (this.props.transaction.paymentAmount * this.props.settings.commission_amount_week)/100;
      }
      siteCommision = commision.toFixed(2)
      hostAmount = (this.props.transaction.paymentAmount - siteCommision).toFixed(2)
    } else{
      siteCommision = 0
      hostAmount = this.props.transaction.paymentAmount
    }
    return(
        <tr>
          <td>{this.props.index}</td> 
          <td>{this.props.transaction._id}</td>
          <td>{this.props.transaction.orderId}</td>
          <td><button className={(this.props.transaction.booking().bookingStatus <=1 )? "btn status-active": "btn status-inactive"} >{(this.props.transaction.booking().bookingStatus == 0)?"Pending":(this.props.transaction.booking().bookingStatus == 1)?"Accepted":"Rejected"}</button>
          </td>
          <td>{this.props.transaction.paymentAmount}</td>
          <td>{siteCommision}</td>
          <td>{hostAmount}</td>
          <td><button className={(this.props.transaction.paymentStatus < 0 )? "btn status-active": "btn status-inactive"} >{(this.props.transaction.paymentStatus == -1)? "Pending":(this.props.transaction.paymentStatus == 0)? "Success":"Failed"}</button></td>
          <td><button className={(this.props.transaction.paymentStatus < 0 )? "btn status-active": "btn status-inactive"} >{(this.props.transaction.paymentStatus < 0)? "Confirm Payment": "Paid"}</button></td>
        </tr>
    );
  }
}

export class OrderFilter extends Component {
  componentDidMount() {
    //dropdown list
    $('body').click(function(){
        $('.custom-select .drop-down-list:visible').slideUp();
    });
    $('.custom-select .active-list').click(function(){
        $(this).parent().find('.drop-down-list').stop( true, true ).delay(10).slideToggle();
    }); 

    //datepicker
     let endDate = new Date().setFullYear(new Date().getFullYear() + 1);

    // initialise start date and arrival date timepicker
    $('#checkinDate').datetimepicker({
        format : 'YYYY-MM-DD'
    }).on('dp.change', function (selected) {
      if ($('#checkinDate').val()){
        if(new Date($('#checkinDate').val()) > new Date($('#checkoutDate').val()) ){
          $('#checkoutDate').data("DateTimePicker").date(new Date($('#checkinDate').val()));
          $('#checkoutDate').data("DateTimePicker").minDate(new Date($('#checkinDate').val()));
        }
      }
        // var minDate = new Date(selected.date.valueOf());
    });
    // initialise end date timepicker
    $('#checkoutDate').datetimepicker({
        format : 'YYYY-MM-DD',
        minDate: '2016-01-01'
    }); 
  }

  dropDownClick(value,event){
        var parent = $(event.currentTarget).parent().parent();
        parent.find('.active-list').addClass('added');
        parent.find('.active-list').text( $(event.currentTarget).text() ).removeClass('opened');
        // parent.find('input.list-field').attr('value', value );
        parent.find('input.list-field').val(value);
  }
  
  applyFilter(event){
    FlowRouter.setQueryParams({page: 1});

    let status = $('#filter-status').val() || 'all',
        type = $('#filter-type').val() || 'all',
        checkin = this.refs.checkinDate.value || null,
        checkout = this.refs.checkoutDate.value || null,
        filter_data = {};
    // booking status filtering
    if(status == 'all')
      filter_data['bookingStatus'] = { $ne: -1 }
    else
      filter_data['bookingStatus'] = parseInt(status)
   
   // booking type filtering
   if(type == 'all')
      delete filter_data.bookingType
    else
      filter_data['bookingType'] = type

  // filter by date
  if(checkin && checkout)
   filter_data['$and'] = [ { "checkinDate": {"$gte": new Date(checkin)}},{"checkoutDate": {"$lte": new Date(checkout)}}]
  else if(checkin )
    filter_data['checkinDate'] =  new Date(checkin)
  else if(checkout )
    filter_data['checkoutDate'] = new Date(checkout)
  else    
    delete filter_data['$and']
  console.log("filter_data")
  console.log(filter_data)
   Session.set('order-filter',filter_data)

  }

  render () {
    return (
      <div>
        <div className="row top-strip-db">
          <div className="col-sm-2">
            <div className="custom-select">
              <div className="active-list">Please select</div>
              <input type="text" id="filter-status" className="list-field"/>
              <ul className="drop-down-list">
                <li data-value = "all" onClick={this.dropDownClick.bind(this,'all')}>All</li>
                <li data-value ="0" onClick={this.dropDownClick.bind(this,'0')}>Pending</li>
                <li data-value = "1" onClick={this.dropDownClick.bind(this,'1')}>Accepted</li>
                <li data-value = "2" onClick={this.dropDownClick.bind(this,'2')}>Rejected</li>
              </ul>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="custom-select">
              <div className="active-list">Please select</div>
              <input type="text" id="filter-type" className="list-field"/>
              <ul className="drop-down-list">
                <li data-value = "all" onClick={this.dropDownClick.bind(this,'all')}>All</li>
                <li data-value ="0" onClick={this.dropDownClick.bind(this,'dayBooking')}>Daily</li>
                <li data-value = "1" onClick={this.dropDownClick.bind(this,'weekBooking')}>Weekly</li>
              </ul>
            </div>
          </div>
          <div className="col-sm-2">
           <input type="text" placeholder="CHECK-IN DATE" id="checkinDate" ref="checkinDate" className="form-control avail-date" />
          </div>
          <div className="col-sm-2">
            <input type="text" placeholder="CHECK-OUT DATE" id="checkoutDate" ref="checkoutDate" className="form-control avail-date" />
          </div>
          <div className="col-sm-2">
            <button className="btn primary-btn std-height" onClick={this.applyFilter.bind(this)}>Search Order</button>
          </div>
        </div>
      </div>
    );
  }
}