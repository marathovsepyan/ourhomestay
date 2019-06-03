import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
var Validation = require('react-validation');
var validator = require('validator');

import { CountryList } from './../../helper/constants.js';


// Extend Validation with custom rules 
Validation.extendErrors({
    isRequired: {
        rule: function(value) {
            return Boolean(validator.trim(value));
        }
    },
    isMinLength : {
      rule: function(value) {
          return Boolean(validator.trim(value).length >=4);
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

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error   : "",
      success : ""      
    };
  }

  componentDidMount() {
    if(Meteor.userId()){
      if(Roles.subscription.ready()) {
        if (Roles.userIsInRole(Meteor.userId(), 'Admin')) {
            FlowRouter.go('/admin/homestays')
        } else if (Roles.userIsInRole(Meteor.userId(), 'Student')) {
            FlowRouter.go('home')
        } else if (Roles.userIsInRole(Meteor.userId(), 'Homestay')){
            FlowRouter.go('/homestay')
        } else if (Roles.userIsInRole(Meteor.userId(), 'Agency')) {
            FlowRouter.go('/agency/profile')
        } else if (Roles.userIsInRole(Meteor.userId(), 'University residence')) {
            FlowRouter.go('/universityresidence')
        }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var self = this;
    // console.log($(event.currentTarget).find('label').find("input#terms[type=checkbox]:checked").length)
    if($(event.currentTarget).find('label').hasClass("active")) {
      $(event.currentTarget).find('#signUpButton').prop('disabled',true)
      /*const user_firstname       = ReactDOM.findDOMNode(this.refs.firstName).value.trim(),
            user_lastname        = ReactDOM.findDOMNode(this.refs.lastName).value.trim(),
            user_mobile          = ReactDOM.findDOMNode(this.refs.mobile).value.trim(),
            user_email           = ReactDOM.findDOMNode(this.refs.email).value.trim(),
            user_password        = ReactDOM.findDOMNode(this.refs.password).value.trim(),
            user_role            = ReactDOM.findDOMNode(this.refs.role).value.trim(),
            user_country         = ReactDOM.findDOMNode(this.refs.country).value.trim();*/
      const user_firstname       = $(event.currentTarget).find('#firstName').val().trim(),
            user_lastname        = $(event.currentTarget).find('#lastName').val().trim(),
            user_mobile          = $(event.currentTarget).find('#mobile').val().trim(),
            user_email           = $(event.currentTarget).find('#email').val().trim(),
            user_password        = $(event.currentTarget).find('#password').val().trim(),
            user_role            = $(event.currentTarget).find('#role').val().trim(),
            user_country         = $(event.currentTarget).find('#country').val().trim();
      var  status               = '';
      if (user_role == 'Student') {
          status          = 'active'
      } else {
          status          = 'inactive'
      }
      var profile = {
          firstName : user_firstname,
          lastName  : user_lastname,
          name      : user_firstname+' '+user_lastname,
          mobile    : user_mobile,
          role      : user_role,
          country   : user_country,
          status    : status 
      }
      // var account = {
      //     firstName : user_firstname,
      //     lastName  : user_lastname,
      //     email     : user_email.toLowerCase(),
      //     mobile    : user_mobile,
      //     country   : user_country
      // }
       if (user_role == "Homestay") {
        profile["homestayId"] = ""
       }
      var _this= $(event.currentTarget)
      // create user
      Accounts.createUser({
          email       : user_email.toLowerCase(),
          password    : user_password,
          profile     : profile
      }, function (error) {
          _this.find('#signUpButton').prop('disabled',false)
          if (error) {
              self.setState({'error': error.reason});
          } else {
              self.setState({'success': 'Successfully registered'});
              if (user_role == 'Student')
                FlowRouter.go('/')
              else if (user_role == 'Homestay')
                FlowRouter.go('/homestay')
              else if (user_role == 'Agency')
                FlowRouter.go('/agency/profile')
              else if (user_role == 'University residence')
                FlowRouter.go('/universityresidence')
          }
      });
    } else {
      self.setState({'error': "Please accept terms and conditions"});
    }
  }

  customCheckbox (event){
      event.preventDefault();
      console.log($(event.currentTarget))
      $(event.currentTarget).find('label').toggleClass('active'); 
      if($(event.currentTarget).find('label').hasClass('active')){
          $(event.currentTarget).find('label').find('#terms').prop('checked', true);
      }else{
        console.log(2)
          $(event.currentTarget).find('label').find('#terms').prop('checked', false);
      }
  }

  renderRegisterForm() {
    var errorDiv = '';
    if(this.state.error) {
      errorDiv = <div className="error-message">
                {this.state.error}  
              </div>
    } 
    if(this.state.success) {
      errorDiv = <div className="success-message">
                  {this.state.success}
                </div>
    }
    let options = CountryList.map(function (country,index){
      return (
          <option key={index} value={country}>{country}</option>
      )
    });
    return (
      <section className="main-content-wrapper signup">
        <div className="container">
          <div className="user-accounts-wrapper">
            <div className="user-logo"><a href="/"><img src="../images/logo.png" alt /></a></div>
            <div className="header-wrap">Sign up Now</div>
            <Validation.Form id="form-register" role="form" onSubmit={this.handleSubmit.bind(this)} className="user-form-wrap">
              <div className="row">
                <div className="col-sm-12">
                 {errorDiv}
                </div>
              </div>
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
                          errorMessage: 'Please enter your First Name'
                        }
                      ]}
                      placeholder="Enter First Name"/>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="lastName" className="control-label">Last Name </label>
                    <Validation.Input 
                      type="text" 
                      className="form-control" 
                      name="lastName" 
                      id="lastName" 
                      ref="lastName"
                      blocking='input'
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter your Last Name'
                        }
                      ]}
                      placeholder="Enter Last Name" />
                  </div> 
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="mobile" className="control-label">Mobile</label>
                    <Validation.Input 
                      type="text" 
                      className="form-control" 
                      id="mobile" 
                      ref="mobile" 
                      name="mobile" 
                      blocking='input'
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter your Mobile Number'
                        },
                        {
                          rule: 'isMinLength',
                          errorMessage: 'Enter a valid contact number'
                        },
                        {
                          rule: 'isNumeric',
                          errorMessage: 'Enter a valid Mobile Number'
                        }
                      ]}
                      placeholder="Enter Mobile" />
                  </div> 
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
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
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="Password" className="control-label">Password</label>
                    <Validation.Input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      name="password" 
                      ref="password"
                      maxLength = "15"
                      blocking='input' 
                      validations={[
                        {
                          rule: 'isRequired', 
                          errorMessage: 'Please enter your password'
                        },
                        {
                          rule : "minLengthCheck",
                          errorMessage : "Password should have minimum 6 characters"
                        }
                      ]}
                      placeholder="Enter Password" 
                      autoComplete="off" />
                  </div> 
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="role" className="control-label">Role</label>
                    <select id="role" className="form-control" ref="role" name="role">
                      <option value="Student">Student</option>
                      <option value="Homestay">Homestay</option>
                      <option value="Agency">Agency</option>
                      <option value="University residence">University residence</option>
                    </select>
                  </div> 
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="country" className="control-label">Country</label>
                    <select id="country" defaultValue="Canada" className="form-control" ref="country" name="country">
                      {options}
                    </select>
                  </div> 
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group middle-block">
                    <div className="custom-checkbox terms" onClick={this.customCheckbox.bind(this)}>
                      <label>
                        <input 
                          id="newsUpdates terms" 
                          type="checkbox" 
                          ref="terms"
                          defaultValue = "true" 
                          name="terms" /> I Accept Terms and Conditions
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group text-center">
                    <Validation.Button type="submit" id="signUpButton" className="btn primary-btn lg btn-block" value="Sign Up" />
                    <a className="option-for-user user-login" href="/login">Already have an account?</a>
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
    
    return this.renderRegisterForm()
  }
  };
  