import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import { createNewUser } from '../../../api/user/methods.js';

var Validation = require('react-validation');
var validator = require('validator');

// Extend Validation with custom rules 
Validation.extendErrors({
    isRequired: {
        rule: function(value) {
            return Boolean(validator.trim(value));
        }
    },
    minLengthCheck : {
      rule: function(value) {
            return Boolean(validator.trim(value).length >= 6);
      }
    },
    isChecked : {
      rule : function(value) {
            console.log(value)
      }
    }
});

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reg_error: '',
      reg_success:''
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    var self = this;
      self.setState({'reg_error':''});
      self.setState({'reg_success':''});
      /*const firstName   = ReactDOM.findDOMNode(this.refs.firstName).value.trim(),
        lastName        = ReactDOM.findDOMNode(this.refs.lastName).value.trim(),
        role            = ReactDOM.findDOMNode(this.refs.role).value.trim(),
        email           = ReactDOM.findDOMNode(this.refs.email).value.trim(),
        status          = 'active';*/
        const firstName   = $(event.currentTarget).find('#firstName').val().trim(),
          lastName        = $(event.currentTarget).find('#lastName').val().trim(),
          role            = $(event.currentTarget).find('#role').val().trim(),
          email           = $(event.currentTarget).find('#email').val().trim(),
          status          = 'active';

        var password = Random.secret([6]);
        // create user
        var userData = {
          email: email.toLowerCase(),
          password: password,
          profile:{
              firstName : firstName,
              lastName  : lastName,
              name      : firstName+' '+lastName,
              email     : email,
              role      : role,
              status    : status 
          }
        }
        if (role === 'Homestay' || role ===  'University residence' ){
          userData.profile['homestayId'] = ''
        }
        var _this = $(event.currentTarget);
        $(event.currentTarget).find('#addUserButton').prop('disabled',true)
        // Method for create new user
        createNewUser.call(userData, (error, res)=> {
            if (error) {
                _this.find('#addUserButton').prop('disabled',false)
                console.log(error)
                self.setState({'reg_error':error.reason});
            } else {
                var options = {}
                options['subject'] = 'OurHomeStay - Account Created'
                options['message'] = 'New accout created. Try Login with the given password and change your password. Password : '+password

                options['recipient'] = email;
                params  = {
                  recipient_name : firstName +' '+lastName, 
                  link : "http://52.42.62.56:3000/"
                };
                options['params'] = params;
                options['mail_template'] = "notification";

                // Method for send email
                Meteor.call("sendMail", options, function (error) {
                  _this.find('#addUserButton').prop('disabled',false)
                  if(error){
                    console.log(error)
                    console.log('Sorry!. Failed to send mail.')
                    self.setState({'reg_error':'Sorry!. Failed to send mail.'});
                  }else{
                    console.log('Successfully created new account and send mail to user.')
                    self.setState({'reg_success':'Successfully created new account and send mail to user.'});
                  }
                })
            }
        });
  }
  componentDidMount() {
    if(Roles.subscription.ready()) {
      if (!Roles.userIsInRole(Meteor.userId(), 'Admin')) {
          FlowRouter.go('noaccess')
      }
    }
  }
  getMessage() {
    if(this.state.reg_error) {
      return ( <div className="row">
                    <div className="col-sm-12">
                      <div className="error-message">
                        {this.state.reg_error}
                      </div>
                    </div>
                  </div>
              )
    }
    if (this.state.reg_success) {
      return ( <div className="row">
                    <div className="col-sm-12">
                      <div className="success-message">
                        {this.state.reg_success}
                      </div>
                    </div>
                  </div>
              )
    }
  }

  getAddUserForm () {
    return (
      <section className="dashboard-content-wrapper signup">
        <div className="container">
          <div className="user-accounts-wrapper">
            <div className="user-logo"><a href="/admin/homestays"><img src="../images/logo.png" alt /></a></div>
            <div className="header-wrap">Add User</div>
            <Validation.Form id="form-addUser" action="#" className="user-form-wrap" role="form" onSubmit={this.handleSubmit.bind(this)}>
              {this.getMessage()}
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="firstName" className="control-label">First Name </label>
                    <Validation.Input 
                      type="text" 
                      className="form-control" 
                      name="firstName" 
                      ref="firstName" 
                      id="firstName" 
                      blocking='input'
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter First Name'
                        }
                      ]}
                      placeholder="Enter First Name" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="lastName" className="control-label">Last Name </label>
                    <Validation.Input 
                      type="text" 
                      className="form-control" 
                      name="lastName" 
                      ref="lastName" 
                      id="lastName" 
                      blocking='input'
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter Last Name'
                        }
                      ]}
                      placeholder="Enter Last Name" />
                  </div> 
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="role" className="control-label">Role</label>
                    <select id="role" className="form-control" name="role" ref="role">
                      <option value="Student">Student</option>
                      <option value="Homestay">Homestay</option>
                      <option value="Agency">Agency</option>
                      <option value="Accounting">Accounting</option>
                      <option value="University residence">University residence</option>
                    </select>
                  </div> 
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="email" className="control-label">Email</label>
                    <Validation.Input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email" 
                      ref="email" 
                      blocking='input'
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter your Email ID'
                        },
                        {
                          rule : 'isEmail',
                          errorMessage: "Enter a valid Email"
                        }
                      ]} 
                      placeholder="Enter Email" />
                  </div> 
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group text-center">
                    <Validation.Button type="submit" id="addUserButton" className="btn primary-btn lg btn-block" value="Add User" />
                  </div>
                </div>
              </div>
            </Validation.Form>
          </div>
        </div>
      </section>
    )
  }
  render() {
    
    return this.getAddUserForm()
  }
};
  