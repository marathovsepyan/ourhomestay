import React, {Component, PropTypes}  from 'react';
import ReactDOM                       from 'react-dom';
import { createContainer }            from 'meteor/react-meteor-data';
import {FlowRouter}                   from 'meteor/kadira:flow-router';

import CircularProgress from 'material-ui/CircularProgress';
import Dialog           from 'material-ui/Dialog';
import FlatButton       from 'material-ui/FlatButton';
import RaisedButton     from 'material-ui/RaisedButton';
import baseTheme        from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';

import Sidebar                from '../../shared/Sidebar.jsx';
import PaginationBar          from '../../components/PaginationBar.jsx';
import { Homestays }          from '../../../api/homestays/homestays.js';
import { assignHomestayUser } from '../../../api/admin/homestays/methods.js';
import { updateHomestay }     from '../../../api/admin/homestays/methods.js';
import { updateUser }         from '../../../api/user/methods.js';
var classNames = require('classnames');

export default class ListHomestays extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success:'',
      currentPage : 1,
      disable:false,
      userCount : this.props.userCount
    };
  }
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentDidMount() {
     Session.set('search_query_email',{'type':'university residence'})
    console.log(Roles.userIsInRole(Meteor.userId(), 'Admin'))
    if(Roles.subscription.ready()) {
      if (!Roles.userIsInRole(Meteor.userId(), 'Admin')) {
          FlowRouter.go('noaccess')
      }
    }
    // Set current Page count
    if (FlowRouter.getQueryParam('page')) {
      this.setState({'currentPage' : Number(FlowRouter.getQueryParam('page'))} )
    }
  }

  //redirect to create homestay page
  createProfilePage(event) {
    FlowRouter.go('/admin/createResidence');
  }
    handleSearchEmail(event){
filter_email = ReactDOM.findDOMNode(this.refs.filter_email).value.trim()
    let query = {'type':'university residence'};
    if(filter_email)
      query['email'] = {$regex: filter_email} 
    console.log(query)
    // HomestayIndex.getComponentMethods().search(query)
    Session.set('search_query_email',query)
    // FlowRouter.go('search')
  }
  //render homestay outer layout
  renderHomestay () {
    console.log("state "+this.state.userCount )
    console.log("props type "+ typeof this.props.userCount )
    console.log("props "+ this.props.userCount )
    if (this.props.homestayLoading && this.props.userCount === 0) {
        return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
    } else {
      if(this.props.userCount > 0) {
        return (
          <div>
           {/**
                       * Render homestay table
                       * Props : homestay array
                       */}
           <HomestayList data={this.props.homestays}/>
           {/**
                       * Render pagination bar
                       * Props : current page index, total usercount
                       */}
           <PaginationBar currentPage={this.state.currentPage} totalCount={this.props.userCount} />
          </div>
        )
      } else {
        // render empty container
        return (
          <div className="col-sm-12">
            <h5> Seems that there is no homestays right now!..</h5>
          </div>
        )
      }
    }
  }

  // render list homestay page
  render() {
        let _this = this;
    return (
      <section className="dashboard-content-wrapper">
        < Sidebar />
        <aside className="right-side-wrapper">
          <div className="dashboard-content">
            <div className="row top-strip-db">
              <div className="col-sm-4">
                <button className="createButton btn secondary-btn std-height"  onClick={this.createProfilePage.bind(this)}> Create University Residence </button>
              </div>
              <aside className="col-sm-6">
                <input type="text" className="form-control" placeholder="Email Address" ref="filter_email" />
              </aside>  
               <aside className="col-sm-2 text-center">
                <a onClick={this.handleSearchEmail.bind(_this)} className="primary-btn lg">Search</a>
              </aside>
            </div>
            {this.renderHomestay()}
          </div>
        </aside>
      </section>
    );
  }
};
ListHomestays.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
ListHomestays.propTypes = {
    homestays: PropTypes.array.isRequired,
    userCount: PropTypes.number.isRequired
};

export default createContainer(() => {
   let query = Session.get('search_query_email');
    const HomestayHandle = Meteor.subscribe('universities',query,10, FlowRouter.getQueryParam('page'));
    return {
        currentUser     : Meteor.user(),
        homestayLoading : !HomestayHandle.ready(),
        homestays       : Homestays.find({},{sort:{'created_at':-1}, limit: 10}).fetch(),
        userCount       : Counts.get('university-count')
    }
}, ListHomestays);

// Homestay table
export class HomestayList extends Component {
    // function to show error message
  getErrorMessage () {
    let error = Session.get('error');
    let success = Session.get('success');

    Session.set('success', null);
    Session.set('error', null) ;

    if(error) {
      return   (<div className="row">
                              <div className="col-sm-12">
                                <div className="error-message">
                                  {error}
                                </div>
                              </div>
                      </div>)
    }
  }

  render() {
    var children =[];
    var modalOpen = this.props.modalOpen;
    let startIndex = 0;
    if(FlowRouter.getQueryParam('page')) {
      startIndex = (Number(FlowRouter.getQueryParam('page'))-1)*10;
    }
    var homestayNodes = this.props.data.map(function (homestay, index) {
      startIndex = startIndex +1;
      //Render each homestay row
      return (
        <Homestay key={homestay._id} homestayId={homestay._id} index={startIndex} name={homestay.name} email={homestay.email} status={homestay.status} ownerId={homestay.ownerId} userId={homestay.userId} userName={homestay.userName} modalOpen={modalOpen}/>
      )
    });

    return(
      <div>
      {this.getErrorMessage ()}
      <table className="table db-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Homestay Name</th>
            <th>Email</th>
            <th>Owner</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {homestayNodes}
        </tbody>
      </table>
      </div>
    );
  }
};

//Render each homestay row
export class Homestay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success:'',
      open: false
    };
  }
  // Function to set muiTheme foe Dailog component
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  //Function to update homestay status
  updateHomestayStatus (event) {
    let updatedStatus = this.props.status;
    if (this.props.status === 'active') {
      updatedStatus = 'inactive';
    } else {
      updatedStatus = 'active';
    }
    let homestayStatus = {
      'status' : updatedStatus
    }
    let self = this;
    let updateHomestay_args = {
      homestayId : this.props.homestayId,
      options : homestayStatus
    }
    updateHomestay.call(updateHomestay_args, (error, res) => {
      if(error){
        Session.set('error',  error.reason)
      }else{
        if (self.props.userId) {
          let options = {
            "Profile.status" : updatedStatus
          }
          let updateUser_args = {
            userId : self.props.userId,
            options : options
          }
          updateUser.call(updateUser_args, (error, res) => {
            if(error){
              Session.set('error',  error.reason)
            }else{
              Session.set('success', 'Updated university residence details')
            }
          })
        } else {
          Session.set('success', 'Updated university residence details')
        }
      }
    })
  }

  //Function to redirect to edit homestay page
  editHomestay (event) {
    FlowRouter.go('/admin/manageResidence?homestayId='+this.props.homestayId+'')
  }
  // Function to open modal
  handleOpen() {
      this.setState({open: true});
  }
  // Function to close modal
  handleClose() {
      this.setState({open: false});
  }
  renderHtml () {
    if (!this.props.userId) {
        const actions = [
            <button className="btn cancel-btn" onClick= {this.handleClose.bind(this)} > cancel </button>,
          ];
       return (<td>
               <button className="btn status-inactive" onClick={this.handleOpen.bind(this)}>Assign User</button>
               <Dialog
                    title="Assign User"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    < AssignForm homestayId={this.props.homestayId} />
                </Dialog>
               </td>)

    } else {
      return ( <td><button className="btn status-inactive" disabled="disabled">Assigned - {this.props.userName} </button></td>)
    }
  }
  render() {

    return(
        <tr>
          <td>{this.props.index}</td>
          <td>{this.props.name}</td>
          <td>{this.props.email}</td>
          {this.renderHtml()}
          <td><button onClick={this.updateHomestayStatus.bind(this)} className={(this.props.status ==="active")?"btn status-active": "btn status-inactive"} >{this.props.status}</button></td>
          <td><button onClick={this.editHomestay.bind(this)} className="btn status-inactive">Manage</button></td>
         </tr>
    );
  }
}
Homestay.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export class AssignForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success:''
    };
  }

  componentDidMount () {
    $("#select").select2({
      placeholder : "Enter User Email Id",
      ajax: {
        url: "/search-university",
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            q: params.term, // search term
            page: params.page
          };
        },
        processResults: function (data, params) {
          // parse the results into the format expected by Select2
          // since we are using custom formatting functions we do not need to
          // alter the remote JSON data, except to indicate that infinite
          // scrolling can be used
          params.page = params.page || 1;
          return {
            results: data,
            pagination: {
              more: (params.page * 30) < data.total_count
            }
          };
        },
        cache: true
      },
      // escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
      minimumInputLength: 2
      // templateResult: formatUser
    });
  }
  handleSubmit(event){
    event.preventDefault();

    var self = this;
      const userData   = this.refs.userEmail.value.trim();
      const userId     = userData.split('-')[0];
      const userName   = userData.split('-')[1];
      if (userId) {
        let assign_args = {
          homestayId : this.props.homestayId,
          userId,
          userName
        }
        assignHomestayUser.call(assign_args, (error, res) =>{
            if (error) {
                self.setState({'error':error.reason});
            }
        });
      } else {
        self.setState({'error':'Please select a user'});
      }
  }

  getMessage() {
    if(this.state.error) {
      return (
        <div className="error-message">
          {this.state.error}
        </div>
      )
    }
  }

  render () {
    return (
      <form className="assign-user-form">
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              {this.getMessage()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label className="control-label" >User Email</label>
              <select id="select"  name="userEmail" ref="userEmail" data-init-plugin="select2"  className="form-control">

              </select>
            </div>
          </div>
        </div>
        <button className="save-btn btn primary-btn std-height"  onClick= {this.handleSubmit.bind(this)}>Assign</button>
      </form>
    )
  }
}
