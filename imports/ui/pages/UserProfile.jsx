import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress'
import Dialog           from 'material-ui/Dialog';

import { CountryList } from './../../helper/constants.js';
import { editProfile }   from './../../api/user/methods.js';

var Validation = require('react-validation');
var validator = require('validator');

export default class UserProfile extends Component{
  componentDidMount() {
    if(Roles.subscription.ready()) {
      if (!Roles.userIsInRole(Meteor.userId(), ['Agency','Student'])) {
        FlowRouter.go('noaccess')
      }
    }
  }
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }


  render () {
    return (
      <section className="main-content-wrapper common-layout-box">
            < UserProfileForm currentUser={this.props.currentUser} />
          </section>
    );
  }
};
// To set theme for material-ui components
UserProfile.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
    return {
        currentUser     : Meteor.user()
    }
}, UserProfile);



// React Component for BookRoom form
export class UserProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error               : "",
      success             : ""
    };
  }


  componentDidMount() {
      //datepicker
      console.log('DOB---------->')
      console.log($('#DOB'))
      console.log(this.props.currentUser)
      let date = "";
      if(this.props.currentUser.profile.dateOfBirth) {
          date = this.props.currentUser.profile.dateOfBirth
      } else {
          date = new Date()
      }
      console.log(date)
      setTimeout(function(){ $('#DOB').datetimepicker({
          format : 'YYYY-MM-DD',
          defaultDate: date // enable only dates 2 weeks after current date
      }) }, 1000)

  }
  // To style radio button on click event
  radioSwitch(event) {
    $(event.currentTarget).parent().find('label').removeClass('active');
    $(event.currentTarget).addClass('active');
  }

  // To handle submit event of bookRoom form
  handleSubmit(event) {
    event.preventDefault();
    this.setState({'error':''});
    this.setState({'success':''});
    var self = this;
    var firstName   = $(event.currentTarget).find('#firstName').val().trim(),
      lastName      = $(event.currentTarget).find('#lastName').val().trim(),
      email         = $(event.currentTarget).find('#email').val().trim(),
      mobile        = $(event.currentTarget).find('#phone').val().trim(),
      gender        = $(event.currentTarget).find("input.gender[type=radio]:checked").val(),
      country       = $(event.currentTarget).find('#country').val().trim(),
      dateOfBirth   = $(event.currentTarget).find('#DOB').val().trim(),
      smoker        = $(event.currentTarget).find("input.smoker[type=radio]:checked").val(),
      pets          = $(event.currentTarget).find("input.pets[type=radio]:checked").val();
      address       = $(event.currentTarget).find("#address").val();

      var profileData = {
        'profile.firstName'     : firstName,
        'profile.lastName'      : lastName,
        'profile.name'          : firstName +' '+lastName,
        'profile.email'         : email,
        'profile.mobile'        : mobile,
        'profile.gender'        : gender,
        'profile.country'       : country,
        'profile.dateOfBirth'   : new Date(dateOfBirth),
        'profile.smoker'        : smoker,
        'profile.pets'          : pets,
        'profile.address'       : address
      }

      editProfile.call(profileData, (error, res) => {
        if(error){
          this.setState({'error' : error.reason})
          document.getElementById('dLabel').scrollIntoView();
        }else{
          this.setState({'success' : 'Updated student details'})
          document.getElementById('dLabel').scrollIntoView();
        }
      })

  }
  // Function to show error message
  getErrorMessage() {
    if(this.state.error) {
      return (<div className="col-sm-8">
                            <div className="error-message">{this.state.error} </div>
                          </div>)
    }
    if (this.state.success) {
      return (<div className="col-sm-8">
                            <div className="success-message">{this.state.success}</div>
                          </div>)
    }
  }

  renderStudentForm() {
    let _this = this;
    let options = CountryList.map(function (country,index){
        return (
            <option key={index} value={country}>{country}</option>
        )
      });
      return (<Validation.Form className="form-horizontal" role="form" id="bookingForm" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                {this.getErrorMessage()}
              </div>
              <div className="form-group" >
                  <label htmlFor="firstName" className="col-sm-3 control-label">Name <i className="semi">:</i></label>
                  <div className="col-sm-4">
                    <Validation.Input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      blocking='input'
                      value = {this.props.currentUser.profile.firstName}
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter your First Name'
                        }
                      ]}
                      placeholder="First Name" />
                  </div>
                  <div className="col-sm-4">
                    <Validation.Input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      blocking='input'
                      value = {this.props.currentUser.profile.lastName}
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter your Last Name'
                        }
                      ]}
                      placeholder="Last Name" />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Gender <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <div className="radio-switch">
                    <label className={(this.props.currentUser.profile.hasOwnProperty("gender"))?(this.props.currentUser.profile.gender === "Male")?"active":"":"active"} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" className="gender" name="gender" defaultValue="Male" defaultChecked={(this.props.currentUser.profile.hasOwnProperty("gender"))?(this.props.currentUser.profile.gender === "Male")?"checked":"":"checked"} /> Male
                    </label>
                    <label className={(this.props.currentUser.profile.gender === "Female")?"active":""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" className="gender" name="gender" defaultValue="Female" defaultChecked={(this.props.currentUser.profile.gender === "Female")?"checked":""} /> Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="col-sm-3 control-label">Email ID <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <fieldset disabled={(this.props.currentUser)? "disabled" : ""} >
                    <Validation.Input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      blocking='input'
                      value = {this.props.currentUser.emails[0].address}
                      validations={[
                        {
                          rule: 'isRequired',
                          errorMessage: 'Please enter Email ID'
                        },
                        {
                          rule : 'isEmail',
                          errorMessage: "Enter a valid Email"
                        }
                      ]}
                      placeholder="Enter your Email ID" />
                    </fieldset>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="col-sm-3 control-label">Mobile <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    blocking='input'
                    placeholder="Eg:-  +1 250-418-6812 "
                    blocking='input'
                    value = {this.props.currentUser.profile.mobile}
                    validations={[
                      {
                        rule: 'isRequired',
                        errorMessage: 'Please enter contact number'
                      },
                      {
                        rule: 'isMinLength',
                        errorMessage: 'Enter a valid contact number'
                      },
                      {
                        rule: 'isNumber',
                        errorMessage: 'Enter a valid contact number'
                      }
                    ]}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="dob" className="col-sm-3 control-label">Date of Birth<i className="semi">:</i></label>
                <div className="col-sm-3">
                  <input
                    type="text"
                    className="form-control dob"
                    placeholder="DOB"
                    id="DOB"
                    name="DOB"
                    ref="DOB"
                    autoComplete="off" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Country<i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Select
                    value= {this.props.currentUser.profile.country}
                    id="country"
                    className="form-control"
                    ref="country"
                    name="country"
                    validations={[
                      {
                        rule: 'isRequired',
                        errorMessage: 'Please Select Country'
                      }
                    ]}>
                    {options}
                  </Validation.Select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Smoker <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <div className="radio-switch">
                    <label className={(this.props.currentUser.profile.smoker ==="No")?"active":""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="smoker" className="smoker" ref="smoker" defaultValue="No" defaultChecked={(this.props.currentUser.profile.smoker ==="No")?"checked":""} /> No
                    </label>
                    <label className={(this.props.currentUser.profile.smoker ==="Yes")?"active":""} onClick={this.radioSwitch.bind(this)} >
                      <input type="radio" name="smoker" className="smoker" ref="smoker" defaultValue="Yes" defaultChecked={(this.props.currentUser.profile.smoker === "Yes")?"checked":""} /> Yes
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Pets <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <div className="radio-switch">
                    <label className={(this.props.currentUser.profile.pets === "No")?"active":""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="pets" className="pets" ref="pets" defaultValue="No" defaultChecked={(this.props.currentUser.profile.pets === "No")?"checked":""} /> No
                    </label>
                    <label className={(this.props.currentUser.profile.pets === "Yes")?"active":""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="pets" className="pets" ref="pets" defaultChecked={(this.props.currentUser.profile.pets === "Yes")?"checked":""} defaultValue="Yes" /> Yes
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="puposeStay" className="col-sm-3 control-label">Address<i className="semi">:</i></label>
                <div className="col-sm-8">
                  <textarea rows={3} className="form-control" id="address" name="address" placeholder="Address" defaultValue={(this.props.currentUser.profile.address)?this.props.currentUser.profile.address:""} />
                </div>
              </div>
              <br />
              <div className="form-group">
                <div className="col-sm-3" />
                <div className="col-sm-8">
                  {/*<a href="confirm-booking.html" className="btn primary-btn">Proceed</a>*/}
                  {/*<button class="btn primary-btn">Proceed</button>*/}
                  <Validation.Button className="btn primary-btn" value="Update Profile" />
                  {/*<button className="btn cancel-btn" onClick={this.clearForm.bind(this)}>Cancel</button>*/}

                </div>
              </div>
            </Validation.Form>
            )
  }
  renderForm() {
      return (
        <section className="common-layout-box-wrap">
         <div className="header-wrap">My Profile</div>
          <article className="common-layout-content students-form">
            {this.renderStudentForm()}
          </article>
        </section>
      )
    }
  render() {
    return this.renderForm()
  }
}
