import React, {Component, PropTypes} from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';

import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';

import { Homestays } from './../../api/homestays/homestays.js';
import { createHomestay } from './../../api/admin/homestays/methods.js';
import { updateHomestay } from './../../api/admin/homestays/methods.js';
import { CountryList } from './../../helper/constants.js';
import { CityList } from './../../helper/constants.js';
import { FoodRestrictions } from './../../helper/constants.js';
import { PetTypes } from './../../helper/constants.js';
import { Meals } from './../../helper/constants.js';


var Validation = require('react-validation');
var validator = require('validator');

// Extend Validation with custom rules
Validation.extendErrors({

    isRequired: {
        className: 'ui-input_state_empty',
        message: 'required',
        rule: function(value) {
            return Boolean(validator.trim(value));
        }
    },
    isEmail: {
        className: 'ui-input_state_email-pattern-failed',
        // validator already has strong email-pattern, so we don't have to extend it by custom
        message: 'should be email'
    },
    isNumber : {
      rule: function(value) {
            return Boolean(validator.trim(value).match(/^[0-9\s]+$/));
        }
    },
    isMinLength : {
      rule: function(value) {
          return Boolean(validator.trim(value).length >=4);
      }
    },
    isHomeNumber : {
      rule: function(value) {
        if (!value) {
          return true
        } else {
          if (Boolean(validator.trim(value).match(/^[0-9\s]+$/)) && Boolean(validator.trim(value).length >=4)) {
            return true
          } else {
            return false
          }
        }
      }
    },
    isMaxLength : {
      rule: function(value) {
          return Boolean(validator.trim(value).length <=10);
      }
    },
    isYoutubeUrl : {
      rule: function(value) {
        if (validator.trim(value)) {
          return Boolean(validator.trim(value).match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/));
        } else {
          return true
        }
      }
    },
    imageValidation : {
      rule : function (value) {
        if (validator.trim(value)) {
          var imageArray = validator.trim(value).split('.');
          var imageArrayLength = imageArray.length;
          var extension = imageArray[imageArrayLength-1]
          return extension.match( new RegExp( /^png|jpe?g|gif/ ) );
        } else {
          return true
        }
      }
    },
    isValidPrice : {
      rule: function(value) {
          return Boolean(validator.trim(value).match(/^\d*(?:\.\d{1,2})?$/));
      }
    },
    isMinPrice : {
      rule: function(value) {
          return Boolean(validator.trim(value) >= 1);
      }
    }
});

export default class CreateHomestay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      homestayId          : '',
      isHomestay          : false,
      error               : "",
      success             : "" ,
      country             : "Canada",
      aboutLength         : 360,
      aboutPetLength      : 360,
      hobbiesLength       : 360,
      members_count       : 0,
      memebers            : []
    };
  }
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentDidMount() {
  //   $('#checkinDate').datetimepicker({
  //     format : 'YYYY-MM-DD'
  // }).on('dp.change', function (selected) {
  //   console.log("hereeeeee222222222")
  //   if ($('#checkinDate').val()){
  //     if(new Date($('#checkinDate').val()) > new Date($('#checkoutDate').val()) ){
  //       $('#checkoutDate').data("DateTimePicker").date(new Date($('#checkinDate').val()));
  //       $('#checkoutDate').data("DateTimePicker").minDate(new Date($('#checkinDate').val()));
  //     }
  //   }
  //     // var minDate = new Date(selected.date.valueOf());
  // });
  // initialise end date timepicker
  $('#birthDate').datetimepicker({
      format : 'YYYY-MM-DD',
      minDate: '2016-01-01'
  }); 

    if(Roles.subscription.ready()) {
      if (! Roles.userIsInRole(Meteor.userId(), ['Admin','Homestay','University residence'])) {
        FlowRouter.go('noaccess')
      }
      if(Roles.userIsInRole(Meteor.userId(), 'Admin')) {
        if (FlowRouter.getRouteName() !== "admin-createHomestay") {
          FlowRouter.go('noaccess')
        }
      } else if(Roles.userIsInRole(Meteor.userId(), 'Homestay')) {
        if (FlowRouter.getRouteName() !== "homestay") {
          FlowRouter.go('noaccess')
        }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({'error':''});
    this.setState({'success':''});
    var self = this;
    if(!$(event.currentTarget).find('#aboutHomestay').val() || !$(event.currentTarget).find('#address').val() 
        || !$(event.currentTarget).find('#aboutPets').val() || !$(event.currentTarget).find('#hobbies').val())  {
      if(!$(event.currentTarget).find('#aboutHomestay').val()){
          $(event.currentTarget).find('#aboutError').html('Please add description about your homestay.')
          $(event.currentTarget).find('#aboutHomestay').addClass('ui-input_state_invalid');
          $(event.currentTarget).find('#createHomestayBtn').prop('disabled',true)
      }
      if (!$(event.currentTarget).find('#address').val()) {
          $(event.currentTarget).find('#addressError').html('Please add homestay address.')
          $(event.currentTarget).find('#address').addClass('ui-input_state_invalid');
          $(event.currentTarget).find('#createHomestayBtn').prop('disabled',true)
      }
      if(!$(event.currentTarget).find('#aboutPets').val()){
        $(event.currentTarget).find('#aboutPetsError').html('Please add description about your pets.')
        $(event.currentTarget).find('#aboutPets').addClass('ui-input_state_invalid');
        $(event.currentTarget).find('#createHomestayBtn').prop('disabled',true)
      }
      if(!$(event.currentTarget).find('#hobbies').val()){
        $(event.currentTarget).find('#hobbiesError').html('Please add description about your hobbies.')
        $(event.currentTarget).find('#hobbies').addClass('ui-input_state_invalid');
        $(event.currentTarget).find('#createHomestayBtn').prop('disabled',true)
      }
      return false
    } else {
      $(event.currentTarget).find('#createHomestayBtn').prop('disabled',false)
      $(event.currentTarget).find('#addressError').html('')
      $(event.currentTarget).find('#aboutError').html('')
      $(event.currentTarget).find('#hobbiesError').html('')
      $(event.currentTarget).find('#aboutPetsError').html('')
      $(event.currentTarget).find('#address').removeClass('ui-input_state_invalid');
      $(event.currentTarget).find('#aboutHomestay').removeClass('ui-input_state_invalid');
      $(event.currentTarget).find('#aboutPets').removeClass('ui-input_state_invalid');
      $(event.currentTarget).find('#hobbies').removeClass('ui-input_state_invalid');

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
        aboutHomestay = $(event.currentTarget).find('#aboutHomestay').val().trim(),
        aboutPets     = $(event.currentTarget).find('#aboutPets').val().trim(),
        hobbies       = $(event.currentTarget).find('#hobbies').val().trim(),
        postalCode    = $(event.currentTarget).find('#postalCode').val().trim(),
        aboutHomestay = $(event.currentTarget).find('#aboutHomestay').val().trim(),
        tenant_gender = $(event.currentTarget).find("input.tenant_gender[type=radio]:checked").val(),
        tenant_smoker = $(event.currentTarget).find("input.tenant_smoker[type=radio]:checked").val()
        status        = 'inactive';
        var foodRestrictions = [];
        var petTypes         = [];
        var mealsOptions     = [];
        $(event.currentTarget).find("input.restrictions[type=checkbox]:checked").each(function() {
          foodRestrictions.push($(this).val());
        });
        $(event.currentTarget).find("input.pettypes[type=checkbox]:checked").each(function() {
          petTypes.push($(this).val());
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
          type              : 'homestay',
          name              : name,
          first_name        : first_name,
          last_name         : last_name,
          country           : country,
          city              : city,
          email             : email,
          phone             : Number(phone),
          home              : Number(home),
          roomsNumber       : Number(roomsNumber),
          peopleLiving      : Number(peopleLiving),
          smoker            : smoker,
          pets              : pets,
          address           : address,
          postalCode        : postalCode,
          aboutHomestay     : aboutHomestay,
          aboutPets         : aboutPets,
          hobbies           : hobbies,
          tenant_gender     : tenant_gender,
          tenant_smoker     : tenant_smoker,
          ownerId           : Meteor.userId(),
          created_at        : new Date(),
          status            : status,
          image             : [],
          videoUrl          : "",
          dailyPrice        : 0,
          weeklyPrice       : 0,
          services          : [],
          foodRestrictions  : foodRestrictions,
          petTypes          : petTypes,
          mealsOptions      : mealsOptions
        }
        if(Roles.userIsInRole(Meteor.userId(), ['Homestay'])) {
          homestay["type"] = "homestay"
          homestay["userId"] = Meteor.userId();
          homestay["userName"] = Meteor.user().profile.name;
        } else if (Roles.userIsInRole(Meteor.userId(), ['University residence'])) {
          homestay["type"] = "university residence"
          homestay["userId"] = Meteor.userId();
          homestay["userName"] = Meteor.user().profile.name;
        }
        if (this.state.homestayId && this.state.isHomestay) {
          let updateHomestay_args = {
            homestayId : this.state.homestayId,
            options    : homestay
          }
          updateHomestay.call(updateHomestay_args, (error, res) => {
            if (error) {
                self.setState({'error':error.reason});
                document.getElementById('dLabel').scrollIntoView();
            } else {
                self.setState({'country': country})
                self.setState({'success':'Successfully updated homestay'});
                document.getElementById('dLabel').scrollIntoView();
            }
          })
        } else {
          createHomestay.call(homestay, (error, response) => {
              if (error) {
                  self.setState({'error':error.reason});
                  document.getElementById('dLabel').scrollIntoView();
              } else {
                  self.setState({'country': country})
                  self.setState({'success':'Successfully created homestay'});
                  document.getElementById('dLabel').scrollIntoView();
                  self.setState({'homestayId': response})
                  self.setState({'isHomestay': true})
                  Session.set('homestayId',response)
              }
          });
        }
    }
  }
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
  getErrorMessage() {
    if(this.state.error) {
      return (<div className="col-sm-8">
                            <div className="error-message">{this.state.error} </div>
                          </div>)
    }
    if (this.state.success) {
      return  (<div className="col-sm-8">
                            <div className="success-message">{this.state.success}</div>
                          </div>)
    }
  }
  homeNumberValidation(event) {
    let number = $(event.currentTarget).val();
    if (!number) {
      $(event.currentTarget).parents('#form-basicDetail').find('#homeError').html('')
      $(event.currentTarget).removeClass('ui-input_state_invalid');
      $(event.currentTarget).parents('#form-basicDetail').find('#createHomestayBtn').prop('disabled',false)
      return true
    } else {
      if (Boolean(validator.trim(number).match(/^[0-9\s]+$/)) && Boolean(validator.trim(number).length >=4)) {
        $(event.currentTarget).parents('#form-basicDetail').find('#homeError').html('')
        $(event.currentTarget).removeClass('ui-input_state_invalid');
        $(event.currentTarget).parents('#form-basicDetail').find('#createHomestayBtn').prop('disabled',false)
        return true
      } else {
        $(event.currentTarget).parents('#form-basicDetail').find('#homeError').html('Enter a valid contact number')
        $(event.currentTarget).addClass('ui-input_state_invalid');
        $(event.currentTarget).parents('#form-basicDetail').find('#createHomestayBtn').prop('disabled',true)
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
      } else if($(event.currentTarget).hasClass('aboutPets')) {
        $(event.currentTarget).parents('#form-basicDetail').find('#aboutPetsError').html('Please add description about your pets.')
      } else if($(event.currentTarget).hasClass('hobbies')) {
        $(event.currentTarget).parents('#form-basicDetail').find('#hobbiesError').html('Please add description about your hobbies.')
      }

      $(event.currentTarget).addClass('ui-input_state_invalid');
      $(event.currentTarget).parents('#form-basicDetail').find('#createHomestayBtn').prop('disabled',true)
      return false
    } else if(text.length >360) {
        if($(event.currentTarget).hasClass('aboutHomestay')) {
          $(event.currentTarget).parents('#form-basicDetail').find('#aboutError').html('Please enter a description within 360 characters')
        } else if($(event.currentTarget).hasClass('address')) {
          $(event.currentTarget).parents('#form-basicDetail').find('#addressError').html('Only 360 characters permitted')
        } else if($(event.currentTarget).hasClass('aboutPets')) {
          $(event.currentTarget).parents('#form-basicDetail').find('#aboutPetsError').html('Please enter a description within 360 characters')
        } else if($(event.currentTarget).hasClass('hobbies')) {
          $(event.currentTarget).parents('#form-basicDetail').find('#hobbiesError').html('Please enter a description within 360 characters')
        }
        
        $(event.currentTarget).addClass('ui-input_state_invalid');
        $(event.currentTarget).parents('#form-basicDetail').find('#createHomestayBtn').prop('disabled',true)
        return false
    } else {
      if($(event.currentTarget).hasClass('aboutHomestay')) {
        $(event.currentTarget).parents('#form-basicDetail').find('#aboutError').html('')
      } else if($(event.currentTarget).hasClass('address')) {
         $(event.currentTarget).parents('#form-basicDetail').find('#addressError').html('')
      } else if($(event.currentTarget).hasClass('aboutPets')) {
        $(event.currentTarget).parents('#form-basicDetail').find('#aboutPetsError').html('')
      } else if($(event.currentTarget).hasClass('hobbies')) {
        $(event.currentTarget).parents('#form-basicDetail').find('#hobbiesError').html('')
      }

      $(event.currentTarget).removeClass('ui-input_state_invalid');
      if($(event.currentTarget).parents('#form-basicDetail').find('#aboutHomestay').val() && $(event.currentTarget).parents('#form-basicDetail').find('#address').val() 
          && $(event.currentTarget).parents('#form-basicDetail').find('#aboutPets').val() && $(event.currentTarget).parents('#form-basicDetail').find('#hobbies').val()) {
          $(event.currentTarget).parents('#form-basicDetail').find('#createHomestayBtn').prop('disabled',false)
      }
      return true
    }
  }
  lengthCount(event) {
    let charLength = $(event.currentTarget).val().length;
    this.setState({'aboutLength' : 360 - charLength})
  }
  lengthPetsCount(event) {
    let charLength = $(event.currentTarget).val().length;
    this.setState({'aboutPetLength' : 360 - charLength})
  }
  lengthHobbiesCount(event) {
    let charLength = $(event.currentTarget).val().length;
    this.setState({'hobbiesLength' : 360 - charLength})
  }
  renderMembersForm() {
    console.log('harut',this.state.members_count)
    if(this.state.members_count > 0) {
      console.log("renderMembersForm", this.state.members_count)
      return (
        <div>
        <div className="form-group">
          <label htmlFor="member_first_name" className="col-sm-4 control-label">First Name <i className="semi">:</i></label><br/>
          <div className="col-sm-8">
            <Validation.Input
              type="text"
              className="form-control"
              id="members"
              name="member_first_name"
              ref="member_first_name"
              placeholder="Enter First Name of Member"
              validations={[
                {
                  rule: 'isRequired',
                  errorMessage: 'Please enter first name of member'
                }
              ]}/>
          </div>
        </div>
        <div className="form-group">
        <label htmlFor="member_last_name" className="col-sm-4 control-label">Last Name <i className="semi">:</i></label><br/>
        <div className="col-sm-8">
          <Validation.Input
            type="text"
            className="form-control"
            id="members"
            name="memberlastt_name"
            ref="member_last_name"
            placeholder="Enter Last Name of Member"
            validations={[
              {
                rule: 'isRequired',
                errorMessage: 'Please enter last name of member'
              }
            ]}/>
        </div>
      </div>
      </div>
      )
    }
  }
  handleMembersChange(event) {
    console.log("event.target.value", event.target.value)
    console.log("members_count", this.state.members_count);
    let difference = event.target.value - this.state.members_count;
    console.log("difference", difference);
    if(difference > 0) {
      while(difference !== 0) {
        console.log("difference111111", difference);
        difference--;
        this.state.memebers.push({ first_name: "",last_name: "" })
      }
    } else {
      while(difference !== 0){
        console.log("difference222222222", difference);
        difference++;
        this.state.memebers.pop();
      }
    }
    this.setState({'members_count': event.target.value});
    console.log("this.members array", this.state.memebers)
  }
  renderBasicForm() {
      let self = this;
      let options = CountryList.map(function (country,index){
        return (
            <option key={index} value={country}>{country}</option>
        )
      });
      let city_options = CityList.map(function (city, index){
        return (
            <option key={index} value={city}>{city}</option>
        )
      })
      let food_restrictions = FoodRestrictions.map(function (restriction,index){
        if (index >=1) {
          return (
            <div>
              <label className="col-sm-4 control-label"></label>
              <div className="col-sm-8">
                <div className="custom-checkbox" onClick={self.customCheckbox.bind(this)}>
                  <label className="">
                    <input type="checkbox" className="restrictions" name="restrictions" value={restriction} ref="restrictions" defaultChecked=""/> {restriction}
                  </label>
                </div>
              </div>
            </div>
          )
        }
      })
      let pet_types = PetTypes.map(function (pet,index){
        if (index >=1) {
          return (
            <div>
              <label className="col-sm-4 control-label"></label>
              <div className="col-sm-8">
                <div className="custom-checkbox" onClick={self.customCheckbox.bind(this)}>
                  <label className="">
                    <input type="checkbox" className="pettypes" name="pettypes" value={pet} ref="restrictions" defaultChecked=""/> {pet}
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
                  <label className="">
                    <input type="checkbox" className="meals" name="meals" value={meal} ref="meals" defaultChecked=""/> {meal}
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
          {this.getErrorMessage()}
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
              blocking="input"
              validations={[
              {
                rule: 'isRequired',
                errorMessage: 'Please enter Name Of Homestay'
              }
              ]}/>
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
              ]}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="last_name" className="col-sm-4 control-label">Last Name <i className="semi">:</i></label>
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
              ]}/>
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
              placeholder="Eg:-  XXX-XXX-XXXX "
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
          <label htmlFor="home" className="col-sm-4 control-label">Home Phone Number <i className="semi">:</i></label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="home"
              ref="home"
              name="home"
              placeholder="Eg:-  XXX-XXX-XXXX "
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
              placeholder={2} />
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
              placeholder={4} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Smoker <i className="semi">:</i></label>
          <div className="col-sm-3">
            <div className="align-with-cols">
              <div className="radio-switch">
                <label className="active" onClick={this.radioSwitch.bind(this)}>
                  <input type="radio" name="smoker" id="smoker" defaultValue="No" ref="smoker" className="smoker" defaultChecked="checked" /> No
                </label>
                <label onClick={this.radioSwitch.bind(this)}>
                  <input type="radio" name="smoker" id="smoker" ref="smoker" className="smoker" defaultValue="Yes" /> Yes
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
                <label className="active" onClick={this.radioSwitch.bind(this)}>
                  <input type="radio" ref="pets" id="pets" className="pets" name="pets" defaultValue="No" defaultChecked="checked"/> No
                </label>
                <label  onClick={this.radioSwitch.bind(this)}>
                  <input type="radio" ref="pets" id="pets" name="pets" className="pets" defaultValue="Yes" /> Yes
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="foodRestrictions" className="col-sm-4 control-label">Pet Types <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className="">
                <input type="checkbox" className="pettypes" name="pettypes" value={PetTypes[0]} ref="pettypes" defaultChecked="" /> {PetTypes[0]}
              </label>
            </div>
          </div>
          {pet_types}
        </div>
        <div className="form-group">
          <label htmlFor="aboutPets" className="col-sm-4 control-label">About Pets <i className="semi">:</i></label>
          <div className="col-sm-8">
            <textarea rows={3} className="form-control aboutPets" id="aboutPets" ref="aboutPets" name="aboutPets" placeholder="Add description about your pets" onBlur={this.textareaValidation.bind(this)} onChange={this.lengthPetsCount.bind(this)} maxLength={360} />
            <span className="ui-hint" id="aboutPetsError"></span>
            <p >{this.state.aboutPetLength} characters remaining</p>
          </div>
        </div> <br />
        <div className="form-group">
          <label htmlFor="foodRestrictions" className="col-sm-4 control-label">Offers Food Options <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className="">
                <input type="checkbox" className="restrictions" name="restrictions" value={FoodRestrictions[0]} ref="restrictions" defaultChecked="" /> {FoodRestrictions[0]}
              </label>
            </div>
          </div>
          {food_restrictions}
        </div>
        <div className="form-group">
          <label htmlFor="meals" className="col-sm-4 control-label">Meals Offered <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className="">
                <input type="checkbox" className="meals" name="meals" value={Meals[0]} ref="meals" defaultChecked=""/> {Meals[0]}
              </label>
            </div>
          </div>
          {meals_options}
        </div><br />
        <div className="form-group">
          <label htmlFor="address" className="col-sm-4 control-label">Address <i className="semi">:</i></label>
          <div className="col-sm-8">
            <textarea rows={3} className="form-control" id="address" ref="address" name="address" placeholder="Please give full address details here" defaultValue={""} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Location" className="col-sm-4 control-label">Name of Location <i className="semi">:</i></label>
          <div className="col-sm-8">
            <Validation.Select
              value={this.state.country}
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
            <Validation.Select
              id="city"
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
              validations={[
                {
                  rule: 'isRequired',
                  errorMessage: 'Please enter Postal Code'
                }
              ]}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="aboutHomestay" className="col-sm-4 control-label">About Homestay <i className="semi">:</i></label>
          <div className="col-sm-8">
            <textarea rows={3} className="form-control aboutHomestay" id="aboutHomestay" ref="aboutHomestay" name="aboutHomestay" placeholder="Add description about your homestay" onBlur={this.textareaValidation.bind(this)} onChange={this.lengthCount.bind(this)} maxLength={360} />
            <span className="ui-hint" id="aboutError"></span>
            <p >{this.state.aboutLength} characters remaining</p>
          </div>
        </div> <br />
        <div className="form-group">
          <label htmlFor="hobbies" className="col-sm-4 control-label">Hobbies <i className="semi">:</i></label>
          <div className="col-sm-8">
            <textarea rows={3} className="form-control hobbies" id="hobbies" ref="hobbies" name="hobbies" placeholder="Add description about your hobbies" onBlur={this.textareaValidation.bind(this)} onChange={this.lengthHobbiesCount.bind(this)} maxLength={360} />
            <span className="ui-hint" id="hobbiesError"></span>
            <p >{this.state.hobbiesLength} characters remaining</p>
          </div>
        </div> <br />
        <div className="form-group">
          <label htmlFor="members" className="col-sm-4 control-label">How many additional members are living in your household <i className="semi">:</i></label><br/>
          <div className="col-sm-8">
            <Validation.Input
              type="number"
              className="form-control"
              id="members"
              name="members"
              ref="members"
              placeholder="Enter Number of Members"
              validations={[
                {
                  rule: 'isRequired',
                  errorMessage: 'Please enter number of members'
                }
              ]}
              onChange={this.handleMembersChange.bind(this)}/>
          </div>
        </div><br/>
        {/* {this.renderMembersForm()} */}
        {this.state.memebers.map((member,index) => (
        <div>
          <p>Additional member {index+1} </p>
          <div className="form-group">
            <label htmlFor="member_first_name" className="col-sm-4 control-label">First Name <i className="semi">:</i></label>
            <div className="col-sm-8">
              <Validation.Input
                type="text"
                className="form-control"
                id="members"
                name="member_first_name"
                ref="member_first_name"
                placeholder="Enter First Name of Member"
                validations={[
                  {
                    rule: 'isRequired',
                    errorMessage: 'Please enter first name of member'
                  }
                ]}/>
            </div>
          </div><br/>
          <div className="form-group">
            <label htmlFor="member_last_name" className="col-sm-4 control-label">Last Name <i className="semi">:</i></label>
            <div className="col-sm-8">
              <Validation.Input
                type="text"
                className="form-control"
                id="members"
                name="memberlastt_name"
                ref="member_last_name"
                placeholder="Enter Last Name of Member"
                validations={[
                  {
                    rule: 'isRequired',
                    errorMessage: 'Please enter last name of member'
                  }
                ]}/>
            </div>
          </div><br/>
          <div className="form-group">
            <label htmlFor="member_last_name" className="col-sm-4 control-label">Date Of Birth <i className="semi">:</i></label>
            <div className="col-sm-8">
              <input type="text" placeholder="DATE OF BIRTH" id="birthDate" ref="birthDate" className="form-control avail-date" />
            </div>
          </div><br/>
          {/* <div className="col-sm-2">
            <input type="text" placeholder="CHECK-OUT DATE" id="checkoutDate" ref="checkoutDate" className="form-control avail-date" />
          </div> */}
          {/* <div className="input-group datetimepicker" id="checkindate">
            <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
            <input className="set-due-date form-control" type="text"/>
          </div> */}
          <div className="form-group">
            <label htmlFor="member_last_name" className="col-sm-4 control-label">Reletionship To Host <i className="semi">:</i></label>
            <div className="col-sm-8">
              <Validation.Input
                type="text"
                className="form-control"
                id="members"
                name="memberlastt_name"
                ref="member_last_name"
                placeholder="Enter Reletionship To Host"
                validations={[
                  {
                    rule: 'isRequired',
                    errorMessage: 'Please enter reletionship to host'
                  }
                ]}/>
            </div>
          </div><br/>
        </div>
        ))}
        <h2 className="profile-category">tenant requirements</h2>
        <p>Adding more stratification will result in a limiting number of available hosts</p>
        <div className="form-group">
          <label className="col-sm-4 control-label">Gender <i className="semi">:</i></label>
          <div className="col-sm-4">
            <div className="align-with-cols">
              <div className="radio-switch radio-switch-3">
                <label onClick={this.radioSwitch.bind(this)}>
                  <input type="radio" name="tenant_gender" defaultValue="Male" ref="tenant_gender" id="tenant_gender" className="tenant_gender" /> Male
                </label>
                <label onClick={this.radioSwitch.bind(this)}>
                  <input type="radio" name="tenant_gender" ref="tenant_gender" id="tenant_gender" defaultValue="Female" className="tenant_gender" /> Female
                </label>
                <label onClick={this.radioSwitch.bind(this)}>
                  <input type="radio" name="tenant_gender" ref="tenant_gender" id="tenant_gender" defaultValue="Both" className="tenant_gender" /> Both
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
                <label onClick={this.radioSwitch.bind(this)}  >
                  <input type="radio" name="tenant_smoker" id="tenant_smoker" defaultValue="No" ref="tenant_smoker" className="tenant_smoker" /> No
                </label>
                <label onClick={this.radioSwitch.bind(this)} >
                  <input type="radio" name="tenant_smoker" id="tenant_smoker" ref="tenant_smoker" defaultValue="Yes" className="tenant_smoker" /> Yes
                </label>
                <label onClick={this.radioSwitch.bind(this)} >
                  <input type="radio" name="tenant_smoker" id="tenant_smoker" ref="tenant_smoker" defaultValue="Both" className="tenant_smoker" /> Both
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-4" />
          <div className="col-sm-8">
            <Validation.Button id="createHomestayBtn" type="submit" className="btn primary-btn lg"  value={(this.state.homestayId && this.state.isHomestay)?"Update Homestay":"Create Homestay"} />
            </div>
        </div>
          </Validation.Form>
      )
  }

  render() {

    let profileCompleteDiv = '';
    let mediaElement = '';
    if (!this.state.isHomestay) {
      profileCompleteDiv = <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active">
                <a href="#basicSettings" aria-controls="basicSettings" role="tab" data-toggle="tab">Basic Settings</a>
              </li>
            </ul>
      mediaElement = <div></div>
    } else {
      profileCompleteDiv = <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active">
                <a href="#basicSettings" aria-controls="basicSettings" role="tab" data-toggle="tab">Basic Settings</a>
              </li>
              <li role="presentation">
                  <a href="#media" aria-controls="media" role="tab" data-toggle="tab">Media</a>
                </li>
                <li role="presentation">
                  <a href="#priceSettings" aria-controls="priceSettings" role="tab" data-toggle="tab">Price Settings</a>
                </li>
                <li role="presentation">
                  <a href="#services" aria-controls="services" role="tab" data-toggle="tab">Services</a>
                </li>
            </ul>
      mediaElement = <Blaze template="media"/>
    }

    return (
      <section className="dashboard-content-wrapper view-profile">
        <section className="view-profile-wrapper">
          <div className="header-wrap">Create Homestay</div>
          {/* Nav tabs */}
          <div className="primary-tabs">

              {profileCompleteDiv}

            {/* Tab panes */}
            <div className="tab-content">

              <div role="tabpanel" className="tab-pane  active" id="basicSettings">
                {this.renderBasicForm()}

              </div>
               <div role="tabpanel" className="tab-pane fade" id="media">
                  {mediaElement}

                </div>
                <div role="tabpanel" className="tab-pane fade" id="priceSettings">
                  < PriceForm homestayId={this.state.homestayId}/>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="services">
                  <ServiceForm homestayId={this.state.homestayId} />
                </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
};
CreateHomestay.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
export default createContainer(() => {
    console.log(Session.get('homestayId'))
    if(Session.get('homestayId'))
      Meteor.subscribe('homestayById',Session.get('homestayId'));

    return {}


}, CreateHomestay);

/*CreateHomestay.propTypes = {
    user: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        user : Users.find({},{limit: 5}).fetch()
    }
}, CreateHomestay);*/

export class PriceForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("price form submit")
    var self = this;
    this.setState({'error':''});
    this.setState({'success':''});

    // var dailyPrice = ReactDOM.findDOMNode(this.refs.dailyPrice).value.trim(),
    //     weeklyPrice = ReactDOM.findDOMNode(this.refs.weeklyPrice).value.trim();
    var dailyPrice  = $(event.currentTarget).find('#dailyPrice').val().trim(),
        weeklyPrice = $(event.currentTarget).find('#weeklyPrice').val().trim();
    if(!dailyPrice && !weeklyPrice) {
      self.setState({'error':'No data entered'});
    } else {
      var options = {
        dailyPrice    : Number(dailyPrice),
        weeklyPrice   : Number(weeklyPrice)
      }
      let updateHomestay_args = {
        homestayId : this.props.homestayId,
        options
      }
      updateHomestay.call(updateHomestay_args, (error, res) => {
        if (error) {
            self.setState({'error':error.reason});
        } else {
            self.setState({'success':'Successfully updated homestay'});
        }
      })
    }
  }
  getErrorMessage(){
    if(this.state.error) {
      return (<div className="col-sm-8">
                      <div className="error-message">{this.state.error} </div>
                    </div>
              )
    }
    if (this.state.success) {
      return(  <div className="col-sm-8">
                      <div className="success-message">{this.state.success}</div>
                    </div>
            )
    }
  }

  renderPriceForm () {
    return (
       <Validation.Form className="form-horizontal" id="form-price" role="form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
        {this.getErrorMessage()}
        </div>
        <div className="form-group">
          <label htmlFor="dailyPrice" className="col-sm-4 control-label">Daily Price ($)<i className="semi">:</i></label>
          <div className="col-sm-3">
            <Validation.Input
              type="text"
              className="form-control"
              name="dailyPrice"
              ref="dailyPrice"
              id="dailyPrice"
              placeholder="Eg:- 225"
              validations={[
                {
                  rule: 'isDecimal',
                  errorMessage: 'Enter a valid daily price.'
                },
                {
                  rule: 'isValidPrice',
                  errorMessage:'Only 2 decimal point is allowed.'
                },
                {
                  rule: 'isMinPrice',
                  errorMessage:'Price should be min $1.'
                }
              ]} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="weeklyPrice" className="col-sm-4 control-label">Weekly Price ($)<i className="semi">:</i></label>
          <div className="col-sm-3">
            <Validation.Input
              type="text"
              className="form-control"
              id="weeklyPrice"
              name="weeklyPrice"
              ref="weeklyPrice"
              placeholder="Eg:- 550"
              validations={[
                {
                  rule: 'isDecimal',
                  errorMessage: 'Enter a valid weekly price.'
                },
                {
                  rule: 'isValidPrice',
                  errorMessage:'Only 2 decimal point is allowed.'
                },
                {
                  rule: 'isMinPrice',
                  errorMessage:'Price should be min $1.'
                }
              ]} />
          </div>
        </div>
        <br />
        <div className="form-group">
          <div className="col-sm-4" />
          <div className="col-sm-8">
            <Validation.Button className="btn primary-btn lg" type="submit" value="Update Changes" />
          </div>
        </div>
      </Validation.Form>
    )
  }
  render() {
    return this.renderPriceForm()
  }
}

export class ServiceForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({'error':''});
    this.setState({'success':''});
    var self = this;
    var serviceArray = [];

    $(event.currentTarget).find("input.services[type=checkbox]:checked").each(function() {
      serviceArray.push($(this).val());
    });
    if(serviceArray.length <=0) {
      self.setState({'error':'Please select any services'});
    } else {
      var options = {
        services      : serviceArray
      }
      let updateHomestay_args = {
        homestayId : self.props.homestayId,
        options
      }
      updateHomestay.call(updateHomestay_args, (error, res) => {
        if (error) {
            self.setState({'error':error.reason});
        } else {
            self.setState({'success':'Successfully updated homestay'});
        }
      })
    }
  }

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

  renderServiceForm() {
    return (
      <form className="form-horizontal" id="form-services" role="form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
         {this.getErrorMessage()}
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Weekly Cleaning of Bedroom <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label>
                <input type="checkbox" className="services" name="services[]" value="Weekly Cleaning of Bedroom" ref="services" /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Will do Laundry for Student <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label>
                <input type="checkbox" className="services" name="services[]" value="Will do Laundry for Student" ref="services" /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Free WiFi <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label >
                <input type="checkbox" className="services" name="services[]" value="Free Wifi" ref="services"   /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Luggage Storage <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label>
                <input type="checkbox" className="services" name="services[]" value="Luggage Storage" ref="services" /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Travel to campus with student on their first day by public transportation <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label>
                <input type="checkbox" className="services" name="services[]" value="Travel to campus with student on their first day by public transportation" ref="services" /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Tour of city in the first week <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label>
                <input type="checkbox" className="services" name="services[]" value="Tour of city in the first week" ref="services" /> Yes
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className="form-group">
          <div className="col-sm-4" />
          <div className="col-sm-8"><button className="btn primary-btn lg" disabled={this.state.servicesBtnDisable} type="submit">Update Changes</button></div>
        </div>
      </form>
    )
  }
  render() {
    return this.renderServiceForm()
  }
}

export class MembersForm extends Component {
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
  // var children =[];
  // console.log("this.props", this.props)
  // var modalOpen = this.props.modalOpen;
  // let startIndex = 0;
  // if(FlowRouter.getQueryParam('page')) {
  //   startIndex = (Number(FlowRouter.getQueryParam('page'))-1)*10;
  // }
  // var homestayNodes = this.props.data.map(function (homestay, index) {
  //   startIndex = startIndex +1;
  //   //Render each homestay row
  //   return (
  //     <Homestay key={homestay._id} homestayId={homestay._id} index={startIndex} name={homestay.name} email={homestay.email} status={homestay.status} ownerId={homestay.ownerId} userId={homestay.userId} userName={homestay.userName} modalOpen={modalOpen}/>
  //   )
  // });

  return(
    <div>
    {this.getErrorMessage ()}
    <div className="form-group">
      <label htmlFor="member_fist_name" className="col-sm-4 control-label">First Name <i className="semi">:</i></label><br/>
        <div className="col-sm-8">
          <Validation.Input
              type="number"
              className="form-control"
              id="member_fist_name"
              name="memember_fist_namembers"
              ref="member_fist_name"
              placeholder="Enter Fist Name of Member"
              validations={[
                {
                  rule: 'isRequired',
                  errorMessage: 'Please enter fist name of member'
                }
          ]}/>
        </div>
    </div>
    </div>
  );
}
};
