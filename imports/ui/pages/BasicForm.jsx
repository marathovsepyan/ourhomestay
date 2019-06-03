import React, {Component, PropTypes} from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';

var Validation = require('react-validation');
var validator = require('validator');

import { CountryList } from './../../helper/constants.js';
import { CityList } from './../../helper/constants.js';
import { FoodRestrictions } from './../../helper/constants.js';
import { Meals } from './../../helper/constants.js';

export default class BasicForm extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        error : "",
        success : "" ,
        aboutLength  : 360
      };
    }
    componentDidMount(){
      this.setState({"aboutLength": this.state.aboutLength - this.props.homestay.aboutHomestay.length})
    }
    //submit event of basic detail form
    handleSubmit(event) {
      event.preventDefault();
      var self = this;
     this.setState({'error' : ''})
     this.setState({'success' : ''})
      if(!$(event.currentTarget).find('#aboutHomestay').val() || !$(event.currentTarget).find('#address').val())  {
        if(!$(event.currentTarget).find('#aboutHomestay').val()){
            $(event.currentTarget).find('#aboutError').html('Please add description about your homestay.')
            $(event.currentTarget).find('#aboutHomestay').addClass('ui-input_state_invalid');
            $(event.currentTarget).find('#updateHomestayBtn').prop('disabled',true)
        }
        if (!$(event.currentTarget).find('#address').val()) {
            $(event.currentTarget).find('#addressError').html('Please add homestay address.')
            $(event.currentTarget).find('#address').addClass('ui-input_state_invalid');
            $(event.currentTarget).find('#updateHomestayBtn').prop('disabled',true)
        }
        return false
      } else {
        $(event.currentTarget).find('#updateHomestayBtn').prop('disabled',false)
        $(event.currentTarget).find('#addressError').html('')
        $(event.currentTarget).find('#aboutError').html('')
        $(event.currentTarget).find('#address').removeClass('ui-input_state_invalid');
        $(event.currentTarget).find('#aboutHomestay').removeClass('ui-input_state_invalid');
          var name        = $(event.currentTarget).find('#name').val().trim(),
            first_name    = $(event.currentTarget).find('#first_name').val().trim(),
            last_name     = $(event.currentTarget).find('#last_name').val().trim(),
            country       = $(event.currentTarget).find('#country').val().trim(),
            city          = $(event.currentTarget).find('#city').val().trim(),
            email         = $(event.currentTarget).find('#email').val().trim(),
            phone         = $(event.currentTarget).find('#phone').val().trim(),
            home          = $(event.currentTarget).find('#home').val().trim(),
            roomsNumber   = $(event.currentTarget).find('#roomsNumber').val().trim(),
            peopleLiving  = $(event.currentTarget).find('#peopleLiving').val().trim(),
            smoker        = $(event.currentTarget).find("input.smoker[type=radio]:checked").val(),
            pets          = $(event.currentTarget).find("input.pets[type=radio]:checked").val(),
            address       = $(event.currentTarget).find('#address').val().trim(),
            postalCode    = $(event.currentTarget).find('#postalCode').val().trim(),
            aboutHomestay = $(event.currentTarget).find('#aboutHomestay').val().trim(),
            tenant_gender = $(event.currentTarget).find("input.tenant_gender[type=radio]:checked").val(),
            tenant_smoker = $(event.currentTarget).find("input.tenant_smoker[type=radio]:checked").val();
          var foodRestrictions = [];
          var mealsOptions     = [];
          $(event.currentTarget).find("input.restrictions[type=checkbox]:checked").each(function() {
            foodRestrictions.push($(this).val());
          });
          $(event.currentTarget).find("input.meals[type=checkbox]:checked").each(function() {
            mealsOptions.push($(this).val());
          });
  
          if (!tenant_gender) {
            tenant_gender = null
          }
          if (!tenant_smoker) {
            tenant_smoker = null
          }
  
          var homestay = {
            name              : name,
            country           : country,
            city              : city,
            email             : email,
            phone             : phone,
            home              : home,
            roomsNumber       : Number(roomsNumber),
            peopleLiving      : Number(peopleLiving),
            smoker            : smoker,
            pets              : pets,
            address           : address,
            postalCode   		: postalCode,
            aboutHomestay     : aboutHomestay,
            tenant_gender     : tenant_gender,
            tenant_smoker     : tenant_smoker,
            updated_at        : new Date(),
            foodRestrictions  : foodRestrictions,
            mealsOptions      : mealsOptions
          }
          let updateHomestay_args = {
            homestayId : this.props.homestay._id,
            options : homestay
          }
          //Meteor method to update homestay data
          updateHomestay.call(updateHomestay_args, (error, response) => {
              if (error) {
                  self.setState({'error':error.reason});
                  document.getElementById('dLabel').scrollIntoView();
              } else {
                  self.setState({'success':'Successfully Updated homestay'});
                  document.getElementById('dLabel').scrollIntoView();
              }
          });
      }
    }
    // functio to show error message
    getMessage () {
      if(this.state.error) {
        return ( <div className="col-sm-8">
                              <div className="error-message">{this.state.error} </div>
                            </div>)
      }
      if (this.state.success) {
        return (<div className="col-sm-8">
                              <div className="success-message">{this.state.success}</div>
                            </div>)
      }
    }
    // Function to style radio button on Click event
    radioSwitch(event) {
      $(event.currentTarget).parent().find('label').removeClass('active');
      $(event.currentTarget).addClass('active');
    }
  
    //custom checkbox
    customCheckbox(event){
        event.preventDefault();
        $(event.currentTarget).find('label').toggleClass('active');
        if($(event.currentTarget).find('label').hasClass('active')){
            $(event.currentTarget).find('input').prop('checked', true);
        }else{
            $(event.currentTarget).find('input').prop('checked', false);
        }
    }
    homeNumberValidation(event) {
      let number = $(event.currentTarget).val();
      if (!number) {
        $(event.currentTarget).parents('#form-basicDetail').find('#homeError').html('')
        $(event.currentTarget).removeClass('ui-input_state_invalid');
        $(event.currentTarget).parents('#form-basicDetail').find('#updateHomestayBtn').prop('disabled',false)
        return true
      } else {
        if (Boolean(validator.trim(number).match(/^[0-9\s]+$/)) && Boolean(validator.trim(number).length >=4)) {
          $(event.currentTarget).parents('#form-basicDetail').find('#homeError').html('')
          $(event.currentTarget).removeClass('ui-input_state_invalid');
          $(event.currentTarget).parents('#form-basicDetail').find('#updateHomestayBtn').prop('disabled',false)
          return true
        } else {
          let errorHtml = '<span class="ui-hint">'+'Enter a valid contact number'+'</span>';
          $(event.currentTarget).parents('#form-basicDetail').find('#homeError').html('Enter a valid contact number')
          $(event.currentTarget).addClass('ui-input_state_invalid');
          $(event.currentTarget).parents('#form-basicDetail').find('#updateHomestayBtn').prop('disabled',true)
          return false
        }
      }
    }
    textareaValidation(event) {
      let text = $(event.currentTarget).val();
      if (!text) {
        if($(event.currentTarget).hasClass('aboutHomestay')) {
          $(event.currentTarget).parents('#form-basicDetail').find('#aboutError').html('Please add description about your homestay.')
        } else if($(event.currentTarget).hasClass('address')) {
          $(event.currentTarget).parents('#form-basicDetail').find('#addressError').html('Please add homestay address')
        }
        $(event.currentTarget).addClass('ui-input_state_invalid');
        $(event.currentTarget).parents('#form-basicDetail').find('#updateHomestayBtn').prop('disabled',true)
        return false
      } else if(text.length >360) {
          if($(event.currentTarget).hasClass('aboutHomestay')) {
            $(event.currentTarget).parents('#form-basicDetail').find('#aboutError').html('Please enter a description within 360 characters')
          } else if($(event.currentTarget).hasClass('address')) {
            $(event.currentTarget).parents('#form-basicDetail').find('#addressError').html('Only 360 characters permitted')
          }
          $(event.currentTarget).addClass('ui-input_state_invalid');
          $(event.currentTarget).parents('#form-basicDetail').find('#updateHomestayBtn').prop('disabled',true)
          return false
      } else {
        if($(event.currentTarget).hasClass('aboutHomestay')) {
          $(event.currentTarget).parents('#form-basicDetail').find('#aboutError').html('')
        } else if($(event.currentTarget).hasClass('address')) {
           $(event.currentTarget).parents('#form-basicDetail').find('#addressError').html('')
        }
        $(event.currentTarget).removeClass('ui-input_state_invalid');
        if($(event.currentTarget).parents('#form-basicDetail').find('#aboutHomestay').val() && $(event.currentTarget).parents('#form-basicDetail').find('#address').val() ) {
            $(event.currentTarget).parents('#form-basicDetail').find('#updateHomestayBtn').prop('disabled',false)
        }
        return true
      }
    }
    lengthCount(event) {
      let charLength = $(event.currentTarget).val().length;
      this.setState({'aboutLength' : 360 - charLength})
    }
    renderBasicForm () {
      let self = this;
      //To loop through country array
      let country_options = CountryList.map(function (country,index){
        return (
            <option key={"county_list" + index} value={country}>{country}</option>
        )
      });
      //To loop through city array
      let city_options = CityList.map(function (city, index){
        return (
            <option key={"city_list" + index} value={city}>{city}</option>
        )
      })
  
      let food_restrictions = FoodRestrictions.map(function (restriction,index){
        if (index >=1) {
          return (
            <div>
              <label className="col-sm-4 control-label"></label>
              <div className="col-sm-8">
                <div className="custom-checkbox" onClick={self.customCheckbox.bind(this)}>
                  <label className={(self.props.homestay.foodRestrictions.indexOf(restriction)>-1) ? "active" : ""}>
                    <input type="checkbox" className="restrictions" name="restrictions" value={restriction} ref="restrictions" defaultChecked={(self.props.homestay.foodRestrictions.indexOf(restriction)>-1) ? "checked" : ""} /> {restriction}
                  </label>
                </div>
              </div>
            </div>
          )
        }
      })
      let meals_options = Meals.map(function (meal,index){
        if (index >=1) {
          return (
            <div>
              <label className="col-sm-4 control-label"></label>
              <div className="col-sm-8">
                <div className="custom-checkbox" onClick={self.customCheckbox.bind(this)}>
                  <label className={(self.props.homestay.mealsOptions.indexOf(meal)>-1) ? "active" : ""}>
                    <input type="checkbox" className="meals" name="meals" value={meal} ref="meals" defaultChecked={(self.props.homestay.mealsOptions.indexOf(meal)>-1) ? "checked" : ""} /> {meal}
                  </label>
                </div>
              </div>
            </div>
          )
        }
      })
      return (
        <Validation.Form className="form-horizontal" id="form-basicDetail" role="form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            {this.getMessage()}
          </div>
          <h2 className="profile-category">homestay specifications</h2>
          <div className="form-group">
  
          </div>
          <div className="form-group">
            <label htmlFor="name" className="col-sm-4 control-label">Name of Homestay <i className="semi">:</i></label>
            <div className="col-sm-8">
              <Validation.Input
                type="text"
                className="form-control"
                id="name"
                ref="name"
                name="name"
                placeholder="Eg:- Adams Homestay"
                validations={[
                {
                  rule: 'isRequired',
                  errorMessage: 'Please enter Name Of Homestay'
                }
                ]}
                value={this.props.homestay.name}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="first_name" className="col-sm-4 control-label">First Name <i className="semi">:</i></label>
            <div className="col-sm-8">
                <Validation.Input
                type="text"
                className="form-control"
                id="first_name"
                ref="first_name"
                name="first_name"
                placeholder="Eg:- Adam"
                blocking="input"
                validations={[
                {
                    rule: 'isRequired',
                    errorMessage: 'Please enter First Name'
                }
                ]}
                value={this.props.homestay.first_name}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="col-sm-4 control-label">Last Homestay <i className="semi">:</i></label>
            <div className="col-sm-8">
                <Validation.Input
                type="text"
                className="form-control"
                id="last_name"
                ref="last_name"
                name="last_name"
                placeholder="Eg:- Levine"
                blocking="input"
                validations={[
                {
                    rule: 'isRequired',
                    errorMessage: 'Please enter Last Name'
                }
                ]}
                value={this.props.homestay.last_name}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-4 control-label">Email Address <i className="semi">:</i></label>
            <div className="col-sm-8">
              <Validation.Input
              type="email"
              className="form-control"
              id="email"
              ref="email"
              value={this.props.homestay.email}
              name="email"
              validations={[
              {
                rule: 'isRequired',
                errorMessage: 'Please enter Email Address'
              },
              {
                rule : 'isEmail',
                errorMessage: "Enter a valid Email"
              }
              ]}
              placeholder="Eg:- adamshomestay@mail.com" />
            </div>
          </div>
          <div className="form-group">
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="col-sm-4 control-label">Phone Number <i className="semi">:</i></label>
            <div className="col-sm-8">
              <Validation.Input
                type="text"
                className="form-control"
                id="phone"
                ref="phone"
                name="phone"
                placeholder="Eg:-  +1 250-418-6812 "
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
                ]}
                value={(this.props.homestay.phone).toString()} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="home" className="col-sm-4 control-label">Home Phone Number <i className="semi">:</i></label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="home"
                ref="home"
                name="home"
                placeholder="Eg:-  +1 250-418-6812 "
                defaultValue={(this.props.homestay.home)?this.props.homestay.home:'' }
                onChange={this.homeNumberValidation.bind(this)} />
                <span className="ui-hint" id="homeError" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="numberRooms" className="col-sm-4 control-label">Number of Rooms/Beds <i className="semi">:</i></label>
            <div className="col-sm-2">
              <Validation.Input
                type="text"
                className="form-control"
                ref="roomsNumber"
                name="roomsNumber"
                id="roomsNumber"
                validations={[
                  {
                    rule: 'isRequired',
                    errorMessage: 'Please enter number of rooms'
                  },
                  {
                    rule: 'isNumeric',
                    errorMessage: 'Enter a valid number'
                  }
                ]}
                value={(this.props.homestay.roomsNumber).toString()} placeholder={2} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="peopleLiving" className="col-sm-4 control-label">Number of People Living <i className="semi">:</i></label>
            <div className="col-sm-2">
              <Validation.Input
                type="text"
                className="form-control"
                id="peopleLiving"
                ref="peopleLiving"
                name="peopleLiving"
                validations={[
                  {
                    rule: 'isRequired',
                    errorMessage: 'Please enter Number of people living'
                  },
                  {
                    rule: 'isNumeric',
                    errorMessage: 'Enter a valid number'
                  }
                ]}
                placeholder={4} value={(this.props.homestay.peopleLiving).toString()} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Smoker <i className="semi">:</i></label>
            <div className="col-sm-3">
              <div className="align-with-cols">
                <div className="radio-switch">
                  <label className={(this.props.homestay.smoker === "No") ? "active" : ""} onClick={this.radioSwitch.bind(this)}>
                    <input type="radio" name="smoker" id="smoker" defaultValue="No" ref="smoker" className="smoker" defaultChecked={(this.props.homestay.smoker === "No") ? "checked" : ""} /> No
                  </label>
                  <label className={(this.props.homestay.smoker === "Yes") ? "active" : ""} onClick={this.radioSwitch.bind(this)}>
                    <input type="radio" name="smoker" id="smoker" ref="smoker" className="smoker" defaultValue="Yes" defaultChecked={(this.props.homestay.smoker === "Yes") ? "checked" : ""}/> Yes
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Has Pets <i className="semi">:</i></label>
            <div className="col-sm-3">
              <div className="align-with-cols">
                <div className="radio-switch">
                  <label className={(this.props.homestay.pets === "No") ? "active" : ""} onClick={this.radioSwitch.bind(this)}>
                    <input type="radio" ref="pets" id="pets" className="pets" name="pets" defaultValue="No" defaultChecked={(this.props.homestay.pets === "No") ? "checked" : ""} /> No
                  </label>
                  <label className={(this.props.homestay.pets === "Yes") ? "active" : ""} onClick={this.radioSwitch.bind(this)}>
                    <input type="radio" ref="pets" id="pets" name="pets" className="pets" defaultValue="Yes" defaultChecked={(this.props.homestay.pets === "Yes") ? "checked" : ""}/> Yes
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="foodRestrictions" className="col-sm-4 control-label">Offers Food Options <i className="semi">:</i></label>
            <div className="col-sm-8">
              <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
                <label className={(this.props.homestay.foodRestrictions.indexOf(FoodRestrictions[0])>-1) ? "active" : ""}>
                  <input type="checkbox" className="restrictions" name="restrictions" value={FoodRestrictions[0]} ref="restrictions" defaultChecked={(this.props.homestay.foodRestrictions.indexOf(FoodRestrictions[0])>-1) ? "checked" : ""} /> {FoodRestrictions[0]}
                </label>
              </div>
            </div>
            {food_restrictions}
          </div>
          <div className="form-group">
            <label htmlFor="meals" className="col-sm-4 control-label">Meals Offered <i className="semi">:</i></label>
            <div className="col-sm-8">
              <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
                <label className={(this.props.homestay.mealsOptions.indexOf(Meals[0])>-1) ? "active" : ""}>
                  <input type="checkbox" className="meals" name="meals" value={Meals[0]} ref="meals" defaultChecked={(this.props.homestay.mealsOptions.indexOf(Meals[0])>-1) ? "checked" : ""} /> {Meals[0]}
                </label>
              </div>
            </div>
            {meals_options}
          </div>
          <div className="form-group">
            <label htmlFor="aboutHomestay" className="col-sm-4 control-label">About Homestay <i className="semi">:</i></label>
            <div className="col-sm-8">
              <textarea rows={3} className="form-control aboutHomestay" id="aboutHomestay" ref="aboutHomestay" name="aboutHomestay" placeholder="Add description about your homestay" onBlur={this.textareaValidation.bind(this)} onChange={this.lengthCount.bind(this)} maxLength={360} defaultValue={this.props.homestay.aboutHomestay} />
              <span className="ui-hint" id="aboutError"></span>
              <p >{this.state.aboutLength} characters remaining</p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address" className="col-sm-4 control-label">Address <i className="semi">:</i></label>
            <div className="col-sm-8">
              <textarea rows={3} className="form-control address" id="address" ref="address" name="address" placeholder="Please give full address details here" onBlur={this.textareaValidation.bind(this)} maxLength={360} defaultValue={this.props.homestay.address}  />
              <span className="ui-hint" id="addressError"></span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Country" className="col-sm-4 control-label">Name of Location <i className="semi">:</i></label>
            <div className="col-sm-8">
              <Validation.Select
                value={this.props.homestay.country}
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
                {country_options}
              </Validation.Select>
              <Validation.Select
                id="city"
                value={this.props.homestay.city}
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
                ref="postalCode"
                placeholder="Enter Postal Code"
                value={this.props.homestay.postalCode}
                validations={[
                  {
                    rule: 'isRequired',
                    errorMessage: 'Please enter Postal Code'
                  }
                ]}/>
            </div>
          </div> <br />
          <h2 className="profile-category">tenant requirements</h2>
          <p>Adding more stratification will result in a limiting number of available hosts</p>
          <div className="form-group">
            <label className="col-sm-4 control-label">Gender <i className="semi">:</i></label>
            <div className="col-sm-4">
              <div className="align-with-cols">
                <div className="radio-switch radio-switch-3">
                  <label className={(this.props.homestay.tenant_gender === "Male") ? "active" : ""} onClick={this.radioSwitch.bind(this)}>
                    <input type="radio" name="tenant_gender" defaultValue="Male" ref="tenant_gender" id="tenant_gender" className="tenant_gender" defaultChecked={(this.props.homestay.tenant_gender === "Male") ? "checked" : ""}/> Male
                  </label>
                  <label className={(this.props.homestay.tenant_gender === "Female") ? "active" : ""} onClick={this.radioSwitch.bind(this)}>
                    <input type="radio" name="tenant_gender" ref="tenant_gender" id="tenant_gender" defaultValue="Female" className="tenant_gender" defaultChecked={(this.props.homestay.tenant_gender === "Female") ? "checked" : ""} /> Female
                  </label>
                  <label className={(this.props.homestay.tenant_gender === "Both") ? "active" : ""} onClick={this.radioSwitch.bind(this)}>
                    <input type="radio" name="tenant_gender" ref="tenant_gender" id="tenant_gender" defaultValue="Both" className="tenant_gender" defaultChecked={(this.props.homestay.tenant_gender === "Both") ? "checked" : ""} /> Both
                  </label>
                </div>
              </div>
            </div>
          </div>
  
          <div className="form-group">
            <label className="col-sm-4 control-label">Smoker <i className="semi">:</i></label>
            <div className="col-sm-4">
              <div className="align-with-cols">
                <div className="radio-switch radio-switch-3">
                  <label onClick={this.radioSwitch.bind(this)} className={(this.props.homestay.tenant_smoker === "No") ? "active" : ""} >
                    <input type="radio" name="tenant_smoker" id="tenant_smoker" defaultValue="No" ref="tenant_smoker" className="tenant_smoker" defaultChecked={(this.props.homestay.tenant_smoker === "No") ? "checked" : ""}/> No
                  </label>
                  <label onClick={this.radioSwitch.bind(this)} className={(this.props.homestay.tenant_smoker === "Yes") ? "active" : ""} >
                    <input type="radio" name="tenant_smoker" id="tenant_smoker" ref="tenant_smoker" defaultValue="Yes" className="tenant_smoker" defaultChecked={(this.props.homestay.tenant_smoker === "Yes") ? "checked" : ""}/> Yes
                  </label>
                  <label onClick={this.radioSwitch.bind(this)} className={(this.props.homestay.tenant_smoker === "Both") ? "active" : ""} >
                    <input type="radio" name="tenant_smoker" id="tenant_smoker" ref="tenant_smoker" defaultValue="Both" className="tenant_smoker" defaultChecked={(this.props.homestay.tenant_smoker === "Both") ? "checked" : ""}/> Both
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4" />
            <div className="col-sm-8">
              <Validation.Button type="submit" className="btn primary-btn lg" id="updateHomestayBtn" value="Update Homestay" />
              </div>
          </div>
        </Validation.Form>
      )
    }
    render () {
      return this.renderBasicForm()
    }
  }