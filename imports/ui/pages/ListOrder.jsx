import React, {Component, PropTypes} from 'react';

import { createContainer } from 'meteor/react-meteor-data';
var createFragment = require('react-addons-create-fragment');

import CircularProgress from 'material-ui/CircularProgress'
import baseTheme        from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import Sidebar          from './../shared/Sidebar.jsx';
import PaginationBar    from './../components/PaginationBar.jsx';

import { Bookings } from './../../api/booking/bookings.js';
import { sendHomestayBooking } from './../../api/homestays/methods.js';

import { updateStatus } from './../../api/booking/methods.js';
import { updateBooking } from '/imports/api/booking/methods.js';



export default class ListOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success:'',
      currentPage : 1,
      skip: ''
    };
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
    if (this.props.orderLoading && this.props.orderCount == 0) {
        return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
    } else {
      if(this.props.orderCount > 0) {
        return (
          <div>
           <OrderList data={this.props.orders} canChangeStatus={this.props.canChangeStatus}/>
           <PaginationBar currentPage={this.state.currentPage} totalCount={this.props.orderCount} />
          </div>
        )
      } else {
        return (
          <div className="col-sm-12">
             <h5> Seems that there is no order right now!..</h5>
          </div>
        )
      }
    }
  }

  render() {
    return (
       <section className="dashboard-content-wrapper">
        <aside className="order-list">
          <div className="dashboard-content">
            <OrderFilter />
            {this.renderOrder()}
          </div>
        </aside>
      </section>
    );
  }
};
ListOrders.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
ListOrders.propTypes = {
    orders: PropTypes.array.isRequired,
    orderCount: PropTypes.number.isRequired
};

export default createContainer(() => {

    const OrderHandle = Meteor.subscribe('all-bookings', 5, FlowRouter.getQueryParam('page'),Session.get('order-filter'));
    return {
        canChangeStatus : Roles.userIsInRole(Meteor.userId(), ['Admin','Homestay','Accounting','University residence']),
        currentUser     : Meteor.user(),
        orderLoading    : !OrderHandle.ready(),
        orders          : Bookings.find({},{sort:{'creationDate':-1},limit: 5}).fetch(),
        orderCount      : Counts.get('booking-count')
    }
}, ListOrders);

export class OrderList extends Component {
  render() {
    let self=this,
        startIndex = 0;
    if(FlowRouter.getQueryParam('page')) {
      startIndex = (Number(FlowRouter.getQueryParam('page'))-1)*5;
    }
    var orderNodes = this.props.data.map(function (order, index) {
      console.log(order)
      startIndex=startIndex+1;
      return (
        <Order key={order._id} order={order} index={startIndex} canChangeStatus={self.props.canChangeStatus}/>
      )
    });

    return(
      <table className="table db-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Checkin Date</th>
            <th>Checkout Date</th>
            <th>Homestay</th>
            <th>Agent</th>
            <th>Student</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Booking Cancellation</th>
          </tr>
        </thead>
        <tbody>
         {orderNodes}
        </tbody>
      </table>
    );
  }
};

export class Order extends Component {
  changeStatus(status,event){
    let data ={}
    data['status']        = status
    data['_id']           = this.props.order._id
    let pre_homestayName  = this.props.order.homestay().name
    updateStatus.call(data, (error, response) => {
            if (error) {
            } else {
              console.log(this.props.order)
              console.log(response)
              if(status == 1) {
                let email_options ={}         
                console.log("test test test")       
                email_options['subject'] = 'OurHomeStay - Booking Accepted'
                email_options['message'] = 'Accepted '+this.props.order.roomType+ ' '+ pre_homestayName+'.'+' For further enquiry contact : '+ response.homestayData.phone+', '+response.homestayData.email+'.'
                email_options['mail_template'] = "notification";

                // send email to student
                if(this.props.order.student()){
                  email_options['recipient'] = this.props.order.student().emails[0].address;
                  params  = {
                    recipient_name : this.props.order.student().profile.name, 
                    link : "http://52.42.62.56:3000/"
                  };
                  email_options['params'] = params;
                  Meteor.call('sendMail',email_options)
                }
                // send email to agent
                if(this.props.order.agent()){
                  email_options['email'] = this.props.order.agent().emails[0].address
                  email_options['recipient'] = this.props.order.agent().emails[0].address
                  params  = {
                    recipient_name : this.props.order.agent().profile.name, 
                    link : "http://52.42.62.56:3000/"
                  };
                  email_options['params'] = params;
                  Meteor.call('sendMail',email_options)
                }
              }
              if(status == 2) {
                let email_options ={}                
                email_options['subject'] = 'OurHomeStay - Booking Rejected'
                email_options['message'] = 'Rejected '+this.props.order.roomType+ ' '+ pre_homestayName
                email_options['mail_template'] = "notification";

                // send email to student
                if(this.props.order.student()){
                  email_options['recipient'] = this.props.order.student().emails[0].address;
                  params  = {
                    recipient_name : this.props.order.student().profile.name, 
                    link : "http://52.42.62.56:3000/"
                  };
                  email_options['params'] = params;
                  Meteor.call('sendMail',email_options)
                }
                // send email to agent
                if(this.props.order.agent()){
                  email_options['email'] = this.props.order.agent().emails[0].address
                  email_options['recipient'] = this.props.order.agent().emails[0].address
                  params  = {
                    recipient_name : this.props.order.agent().profile.name, 
                    link : "http://52.42.62.56:3000/"
                  };
                  email_options['params'] = params;
                  Meteor.call('sendMail',email_options)
                }
                // check homestay alternative choice then send mail
                 if(this.props.order.multipleChoice){
                      console.log("mulipleChoice client")
                      if(this.props.order.currentChoice == 2){
                        let homestay_choice = {
                          homestayId: this.props.order.choice2
                       }
                      sendHomestayBooking.call(homestay_choice, (error, response) => {})

                      } else if(this.props.order.currentChoice == 3 && this.props.order.bookingStatus == 0){
                        let homestay_choice = {
                            homestayId: this.props.order.choice3
                         }
                        sendHomestayBooking.call(homestay_choice, (error, response) => {})
                      }

                     
                  } 
              } 
            }
        });

  }
  canChangeStatus(){
    let self = this
    if(this.props.order.paymentStatus == 0 ) {
      if(this.props.canChangeStatus){
        return (
           <div className="btn-group">
          <button type="button" className="btn status-warning">Pending</button>
          <button type="button" className="btn status-warning dropdown-toggle" data-toggle="dropdown">
            <span className="caret" />
          </button>
            <ul className="dropdown-menu" role="menu">
              <li><a href="#" onClick={self.changeStatus.bind(self,1)}>Accept</a></li>
              <li><a href="#" onClick={self.changeStatus.bind(self,2)}>Reject</a></li>
            </ul>
        </div>
          )
      } else {
        return (<button className="btn status-warning">Pending</button>)
      }
    } else {
      return (<button className="btn status-warning">Pending</button>)
    }
  }

  getOrderStatus(){
    let self = this
    if(this.props.order.bookingStatus == 0){
      return (
        <td>
        {self.canChangeStatus()}
      </td>
      );
    } else if (this.props.order.bookingStatus == 1){
      return (
        <td><button className="btn status-active">Accepted</button></td>
      );
    } else if (this.props.order.bookingStatus == 2){
      return (
        <td><button className="btn status-inactive">Rejected</button></td>
        )
    }
  }

  bookingCancellation(id,event){
  let paymentArg = "";
            paymentArg = { bookingStatus: -1 };
            updateBooking.call({ bookingId: id, bookingDetail: paymentArg }, (error, data) => {
          if (error) {
            console.log(error)
          } else {
            console.log(data)
          }
        })
  }

  render() {
    return(
        <tr>
          <td>{this.props.index}</td> 
          <td>{this.props.order._id}</td>
          <td>{this.props.order.paymentAmount}</td>
          <td>{(this.props.order.bookingType == 'dayBooking')? 'Daily' : 'Weekly'}</td>
          <td>{moment(this.props.order.checkinDate).format('DD MMM YYYY')}</td>
          <td>{moment(this.props.order.checkoutDate).format('DD MMM YYYY')}</td>
          <td>{this.props.order.homestay()? this.props.order.homestay().name : ''}</td>
          <td>{this.props.order.agent()? this.props.order.agent().profile.name : ''}</td>
          <td>{this.props.order.student()? this.props.order.student().profile.name : ''}</td>
          <td><button className={(this.props.order.paymentStatus < 0 || this.props.order.paymentStatus == -2 )? "btn status-inactive": "btn status-active"} >{(this.props.order.paymentStatus < 0)? "Not Paid": (this.props.order.paymentStatus == 0)?"Pending":(this.props.order.paymentStatus == 1)?"Success":"Failed"}</button></td>
          {this.getOrderStatus()}
          <td>{(this.props.order.ownerRole == "Student" || this.props.order.ownerRole == "Agency" )&& (this.props.order.bookingStatus == 0 || this.props.order.bookingStatus == 1) && (this.props.order.paymentStatus != 1 ) ? <button className="btn status-inactive"  onClick={this.bookingCancellation.bind(this,this.props.order._id)}>cancel</button>:""}</td>
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

















