import React, {Component, PropTypes} from 'react';
import ReactDOM    from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
var createFragment = require('react-addons-create-fragment');

import CircularProgress from 'material-ui/CircularProgress'
import baseTheme        from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import Sidebar          from '../../shared/Sidebar.jsx';
import PaginationBar    from '../../components/PaginationBar.jsx';

import { updateUser }   from '../../../api/admin/students/methods.js';


export default class ListStudents extends Component {
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
     Session.set('search_query_email',{"roles":"Student"} )
    if(Roles.subscription.ready()) {
      if (!Roles.userIsInRole(Meteor.userId(), 'Admin')) {
          FlowRouter.go('noaccess')
      }
    }
    if (FlowRouter.getQueryParam('page')) {
      this.setState({'currentPage' : Number(FlowRouter.getQueryParam('page'))} )
    }
  }

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

  handleSearchEmail(event){
    filter_email = ReactDOM.findDOMNode(this.refs.filter_email).value.trim()
    let query = {"roles":"Student"};
    if(filter_email)
      query['emails'] = { $elemMatch: { address: {$regex: filter_email} } } 
    console.log(query)
    // HomestayIndex.getComponentMethods().search(query)
    Session.set('search_query_email',query)
    // FlowRouter.go('search')
  }

  renderStudent () {
    if (this.props.studentLoading && this.props.userCount === 0) {
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
           <StudentList data={this.props.users}/>
           <PaginationBar currentPage={this.state.currentPage} totalCount={this.props.userCount} />
          </div>
        )
      } else {
        return (
          <div className="col-sm-12">
             <h5> Seems that there is no Students right now!..</h5>
          </div>
        )
      }
    }
  }

  render() {
        let _this = this;
    return (
       <section className="dashboard-content-wrapper">
        < Sidebar />
        <aside className="right-side-wrapper">
          <div className="dashboard-content">
            <div className="row top-strip-db">
               <aside className="col-sm-4">
              </aside>
              <aside className="col-sm-6">
                <input type="text" className="form-control" placeholder="Email Address" ref="filter_email" />
              </aside>  
               <aside className="col-sm-2 text-center">
                <a onClick={this.handleSearchEmail.bind(_this)} className="primary-btn lg">Search</a>
              </aside>
            </div>
            {this.getErrorMessage ()}
            {this.renderStudent()}
          </div>
        </aside>
      </section>
    );
  }
};
ListStudents.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
ListStudents.propTypes = {
    users: PropTypes.array.isRequired,
    userCount: PropTypes.number.isRequired
};

export default createContainer(() => {
  let query = Session.get('search_query_email');
    const StudentHandle = Meteor.subscribe('studentList', query, 10, FlowRouter.getQueryParam('page'));
    return {
        currentUser     : Meteor.user(),
        studentLoading  : !StudentHandle.ready(),
        users           : Meteor.users.find({"roles":"Student"},{sort:{'createdAt':-1},limit: 10}).fetch(),
        userCount       : Counts.get('student-count')
    }
}, ListStudents);

export class StudentList extends Component {
  render() {
    var children =[];
    let startIndex = 0;
    if(FlowRouter.getQueryParam('page')) {
      startIndex = (Number(FlowRouter.getQueryParam('page'))-1)*10;
    }
    var studentNodes = this.props.data.map(function (student, index) {
      startIndex=startIndex+1;
      return (
        <Student key={student._id} index={startIndex} userId={student._id} firstName={student.profile.firstName} lastName={student.profile.lastName} role={student.profile.role} email={student.emails[0].address} status={student.profile.status} />
      )
    });

    return(
      <table className="table db-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
         {studentNodes}
        </tbody>
      </table>
    );
  }
};

export class Student extends Component {
  updateUserStatus (event) {
    let updatedStatus = this.props.status;
    if (this.props.status === 'active') {
      updatedStatus = 'inactive';
    } else {
      updatedStatus = 'active';
    }
    let userData = {
      'profile.status' : updatedStatus
    }
    let self = this;
    let updateUser_args = {
      userId : this.props.userId,
      options : userData
    }
    updateUser.call(updateUser_args, (error, res) => {
      if(error){
        Session.set('error',  error.reason)
      }else{
        Session.set('success', 'Updated student details')
      }
    })
  }

  render() {
    return(
        <tr>
          <td>{this.props.index}</td>
          <td>{this.props.firstName}</td>
          <td>{this.props.lastName}</td>
          <td>{this.props.email}</td>
          <td>{this.props.role}</td>
          <td><button onClick={this.updateUserStatus.bind(this)} className={(this.props.status ==="active")?"btn status-active": "btn status-inactive"} >{this.props.status}</button></td>
        </tr>
    );
  }
}
