import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

import { CountryListForStripe } from './../../helper/constants.js';
import { CityList } from './../../helper/constants.js';
import { CurrencyList } from './../../helper/constants.js';
import { Countries } from './../../helper/constants.js';

import { editAccountSetting }   from './../../api/user/methods.js';
// import { stripeManagedAccount }   from './../../api/user/methods.js';

var Validation = require('react-validation');
var validator = require('validator');
var formOnSubmit=false;

export default class UserProfile extends Component{
	componentDidMount() {
		if(Roles.subscription.ready()) {
			if (!Roles.userIsInRole(Meteor.userId(), ['Homestay','University residence'])) {
				FlowRouter.go('noaccess')
			}
		}
	}
	getChildContext() {
	    return { muiTheme: getMuiTheme(baseTheme) };
	}


	render () {
    if (this.props.userLoading) {
        return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
    }else {
		return (
			<section className="main-content-wrapper common-layout-box">
	          < UserProfileForm currentUser={this.props.currentUser} onsubmit={this.props.onsubmit} />
	        </section>
		);
  }
	}
};
// To set theme for material-ui components
UserProfile.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  const userHandler = Meteor.subscribe('userDetail')
    return {
        currentUser     : Meteor.user(),
        userLoading : !userHandler.ready()
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
      console.log('DOB--------------->')
      console.log($('#DOB'))
      console.log(this.props.currentUser)
      let date = "";
			if(this.props.currentUser.profile.dateOfBirth) {
					date = this.props.currentUser.profile.dateOfBirth
			}
			if(this.props.currentUser.account){
					date = this.props.currentUser.account.dateOfBirth
				}
      console.log(date)
      setTimeout(function(){ $('#DOB').datetimepicker({
          format : 'YYYY-MM-DD',
          defaultDate: date // enable only dates 2 weeks after current date
      }) }, 1000)

  }
	//datepickerFun using to form submission time
	datepickerFun(){
		let date = "";
		if(this.props.currentUser.profile.dateOfBirth) {
				date = this.props.currentUser.profile.dateOfBirth
		}
		if(this.props.currentUser.account){
				date = this.props.currentUser.account.dateOfBirth
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
		formOnSubmit = true;

    event.preventDefault();
    this.setState({'error':''});
    this.setState({'success':''});
    var self = this;
    var firstName     = $(event.currentTarget).find('#firstName').val().trim(),
        lastName      = $(event.currentTarget).find('#lastName').val().trim(),
        ssn_last4     = $(event.currentTarget).find('#personalId').val().trim(),
        accNo         = $(event.currentTarget).find('#accNo').val().trim(),
        routingNumber = $(event.currentTarget).find('#routingNumber').val().trim(),
        mobile        = $(event.currentTarget).find('#phone').val().trim(),
        gender        = $(event.currentTarget).find("input.gender[type=radio]:checked").val(),
        country       = $(event.currentTarget).find('#country').val().trim(),
        city          = $(event.currentTarget).find('#city').val().trim(),
        state         = $(event.currentTarget).find('#LocationState').val().trim(),
        currency      = $(event.currentTarget).find('#currency').val().trim(),
        dateOfBirth   = $(event.currentTarget).find('#DOB').val().trim(),
        address       = $(event.currentTarget).find("#address").val();
        postalCode    = $(event.currentTarget).find("#postalCode").val();

    var profileData = {
      'account.firstName'     : firstName,
      'account.lastName'      : lastName,
      'account.ssn_last4'     : ssn_last4,
      'account.accNo'         : accNo,
      'account.routingNumber' : routingNumber,
      'account.mobile'        : mobile,
      'account.gender'        : gender,
      'account.dateOfBirth'   : dateOfBirth,
      'account.country'       : country,
      'account.state'         : state,
      'account.city'          : city,
      'account.currency'      : currency,
      'account.address'       : address,
      'account.postalCode'    : postalCode
    }

    // editAccountSetting.call(profileData, (error, res) => {
    //   if(error){
    //    self.setState({'error' : error.reason})
		// 		document.getElementById('dLabel').scrollIntoView();
		// 		console.log("error:--------",error);
		//
    //   }else{
    //     console.log("after success")
    //     // this.setState({'success' : 'Updated student details'})
    //     Meteor.call('stripeManagedAccount',Meteor.user(), function(error, res) {
    //       console.log("manager-------------------");
    //       if(error){
    //         self.setState({'error' : error.reason})
		// 				document.getElementById('dLabel').scrollIntoView();
    //       }else{
		// 				if(res.error){
		// 					self.setState({'error' : res.message})
		// 					document.getElementById('dLabel').scrollIntoView();
		// 				}else
    //         self.setState({'success' : 'Updated Account Details'})
		// 				document.getElementById('dLabel').scrollIntoView();
    //       }
    //     })
    //   }
    // })

		Meteor.call('stripeManagedAccount',Meteor.user(),profileData, function(error, res) {
			console.log("manager-------------------");
			if(error){
				self.datepickerFun();
				formOnSubmit=false;
				self.setState({'error' : error.reason})
				document.getElementById('dLabel').scrollIntoView();
			}else{
				if(res.error){
					self.datepickerFun();
					formOnSubmit=false;
					self.setState({'error' : res.message})
					document.getElementById('dLabel').scrollIntoView();
				}else
				editAccountSetting.call(profileData, (error, res) => {
					formOnSubmit=false;
					self.datepickerFun();
		      if(error){
		        self.setState({'error' : error.reason})
						document.getElementById('dLabel').scrollIntoView();
						console.log("error:--------",error);
		      }else{
						self.setState({'success' : 'Updated Account Details'})
						document.getElementById('dLabel').scrollIntoView();
		      }
		    })
			}
		})

  }
  // Function to show error message
  getErrorMessage() {
    if(this.state.error) {
      return (<div className="col-sm-8">
                            <div className="error-message" id="error-message">{this.state.error} </div>
                          </div>)
    }
    if (this.state.success) {
      return (<div className="col-sm-8">
                            <div className="success-message" id="success-message" >{this.state.success}</div>
                          </div>)
    }
  }

  renderAccountSettingsForm() {

    console.log("render account settings form")
    let _this = this;
    let country_options = CountryListForStripe.map(function (country,index){
      return (
          <option key={index} value={country}>{Countries[country]}</option>
      )
    });
    //To loop through city array
    let city_options = CityList.map(function (city, index){
      return (
          <option key={index} value={city}>{city}</option>
      )
    })
    let currency_options = CurrencyList.map(function (currency, index){
      return (
          <option key={index} value={currency}>{currency}</option>
      )
    })
		if(formOnSubmit){
			return (
				<div>
						Loading......
				</div>
			)
		}else{
      return (<Validation.Form className="form-horizontal" role="form" id="bookingForm" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                {this.getErrorMessage()}
              </div>
              <div className="form-group" >
                  <label htmlFor="firstName" className="col-sm-4 control-label">Account Holder Name <i className="semi">:</i></label>
                  <div className="col-sm-4">
                    <Validation.Input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
											disabled={this.props.currentUser.account ? "disabled" : ""}
                      value ={this.props.currentUser.account ? this.props.currentUser.account.firstName : this.props.currentUser.profile.firstName}
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
											disabled={this.props.currentUser.account ? "disabled" : ""}
                      value ={this.props.currentUser.account ? this.props.currentUser.account.lastName : this.props.currentUser.profile.lastName}
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
                <label htmlFor="personalId number" className="col-sm-4 control-label">Personal ID <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Input
                    type="text"
                    className="form-control"
                    id="personalId"
                    name="personalId"
                    placeholder="Enter Your Personal Identification Number "
										disabled={this.props.currentUser.account ? "disabled" : ""}
                    value ={this.props.currentUser.account ? this.props.currentUser.account.ssn_last4 : ""}
                    validations={[
                      {
                        rule: 'isRequired',
                        errorMessage: 'Please enter Personal ID number'
                      },
                      {
                        rule: 'isNumber',
                        errorMessage: 'Enter a valid Personal ID number'
                      }
                    ]}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="accNo" className="col-sm-4 control-label">Account Number <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Input
                    type="text"
                    className="form-control"
                    id="accNo"
                    name="accNo"
                    placeholder="Enter Your Account Number "
                    value ={this.props.currentUser.account ? this.props.currentUser.account.accNo : ""}
                    validations={[
                      {
                        rule: 'isRequired',
                        errorMessage: 'Please enter Account Number'
                      },
                      {
                        rule: 'isNumber',
                        errorMessage: 'Enter a valid Account Number'
                      }
                    ]}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="routingNumber" className="col-sm-4 control-label">Routing Number <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Input
                    type="text"
                    className="form-control"
                    id="routingNumber"
                    name="routingNumber"
                    placeholder="Enter Your Routing Number"
                    value ={this.props.currentUser.account ? this.props.currentUser.account.routingNumber : ""}
                    validations={[
                      {
                        rule: 'isRequired',
                        errorMessage: 'Please enter Routing Number'
                      }
                    ]}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Gender <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <div className="radio-switch">
                    <label className={this.props.currentUser.account ? ((this.props.currentUser.account.gender)?(this.props.currentUser.account.gender === "Male")?"active":"":""):""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" className="gender" name="gender" defaultValue="Male" defaultChecked={(this.props.currentUser.account)?(this.props.currentUser.profile.gender === "Male")?"checked":"":"checked"} /> Male
                    </label>
                     <label className={this.props.currentUser.account ? ((this.props.currentUser.account.gender)?(this.props.currentUser.account.gender === "Female")?"active":"":""):""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" className="gender" name="gender" defaultValue="Female" defaultChecked={(this.props.currentUser.account)?(this.props.currentUser.profile.gender === "Female")?"checked":"":"checked"} /> Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="col-sm-4 control-label">Mobile <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Eg:-  +1 250-418-6812 "
                    value ={this.props.currentUser.account ? this.props.currentUser.account.mobile : ""}
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
                <label htmlFor="dob" className="col-sm-4 control-label">Date of Birth<i className="semi">:</i></label>
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
                <label htmlFor="currency" className="col-sm-4 control-label">Currency <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Select
                    type="text"
                    className="form-control"
                    id="currency"
                    name="currency"
                    placeholder="Enter your currency"
                    value ={this.props.currentUser.account ? this.props.currentUser.account.currency : "CAD"}
                    validations={[
                      {
                        rule: 'isRequired',
                        errorMessage: 'Please enter Currency'
                      }
                    ]}>
                    {currency_options}
                  </Validation.Select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="puposeStay" className="col-sm-4 control-label">Address<i className="semi">:</i></label>
                <div className="col-sm-8">
                  <textarea rows={3} className="form-control" id="address" name="address" placeholder="Address" defaultValue={this.props.currentUser.account?this.props.currentUser.account.address : this.props.currentUser.profile.address} />
                </div>
              </div>
							<div className="form-group">
								<label htmlFor="Country" className="col-sm-4 control-label">Name of Location <i className="semi">:</i></label>
								<div className="col-sm-8">
									<Validation.Select
										value ={this.props.currentUser.account ? this.props.currentUser.account.country : "CA"}
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
										<option value=""> Select Country </option>
										{country_options}
									</Validation.Select>
									<Validation.Input
										type="text"
										className="form-control mt-md-nw"
										id="LocationState"
										name="LocationState"
										placeholder="Enter Your State "
										value ={this.props.currentUser.account ? this.props.currentUser.account.state : ""}
										validations={[
											{
												rule: 'isRequired',
												errorMessage: 'Please enter State'
											}
									]}/>
									<Validation.Select
										id="city"
										value ={this.props.currentUser.account ? this.props.currentUser.account.city : ""}
										className="form-control mt-md-nw"
										ref="city"
										name="city"
										validations={[
											{
												rule: 'isRequired',
												errorMessage: 'Please Select City'
											}
										]}>
										<option value=""> Select City </option>
										{city_options}
									</Validation.Select>
								</div>
							</div>
              <div className="form-group">
                <label htmlFor="postalCode" className="col-sm-4 control-label">Postal Code <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Enter Postal Code"
                    value ={this.props.currentUser.account ? this.props.currentUser.account.postalCode : ""}
                    validations={[
                      {
                        rule: 'isRequired',
                        errorMessage: 'Please enter Postal Code'
                      }
                    ]}/>
                </div>
              </div>

              <div className="form-group">
                <div className="form-group text-center">
                  <p>
                      By registering your account, you agree to our Services Agreement and the <a target="_blank" href="https://stripe.com/connect-account/legal">Stripe Connected Account Agreement</a>.
                  </p>
                </div>
              </div>
              <br />
              <div className="form-group">
                <div className="col-sm-4" />
                <div className="col-sm-8">
                  {/*<a href="confirm-booking.html" className="btn primary-btn">Proceed</a>*/}
                  {/*<button class="btn primary-btn">Proceed</button>*/}
                  <Validation.Button className="btn primary-btn" value="Update" />
                  {/*<button className="btn cancel-btn" onClick={this.clearForm.bind(this)}>Cancel</button>*/}
                </div>
              </div>
            </Validation.Form>
            )
		}
  }
  renderForm() {
      return (
        <section className="common-layout-box-wrap">
         <div className="header-wrap">Bank Account Details</div>
          <article className="common-layout-content students-form">
            {this.renderAccountSettingsForm()}
          </article>
        </section>
      )
    }
  render() {
    return this.renderForm()
  }
}
