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

import { Homestays } from './../../api/homestays/homestays.js';
import { updateHomestay } from './../../api/admin/homestays/methods.js';
import { CountryList } from './../../helper/constants.js';
import { CityList } from './../../helper/constants.js';
import { FoodRestrictions } from './../../helper/constants.js';
import { PetTypes } from './../../helper/constants.js';
import { Meals } from './../../helper/constants.js';
// import BasicForm from './BasicForm';
// import PriceForm from './PriceForm';
// import ServiceForm from './ServiceForm';

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
    isMaxLength : {
      rule: function(value) {
          return Boolean(validator.trim(value).length <=3);
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

export default class UpdateHomestay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error           : '',
      success         : ''
    };
  }

  componentDidMount() {
    if(Roles.subscription.ready()) {
      if (!Roles.userIsInRole(Meteor.userId(), ['Admin','Homestay','University residence'])) {
        FlowRouter.go('noaccess')
      }
      if(Roles.userIsInRole(Meteor.userId(), 'Admin')) {
        if (FlowRouter.getRouteName() !== "admin-manageHomestay") {
          FlowRouter.go('noaccess')
        }
      } else if(Roles.userIsInRole(Meteor.userId(), 'Homestay')) {
        if (FlowRouter.getRouteName() !== "homestay") {
          FlowRouter.go('noaccess')
        }
      } else if(Roles.userIsInRole(Meteor.userId(), 'University residence')) {
        if (FlowRouter.getRouteName() !== "universityresidence") {
          FlowRouter.go('noaccess')
        }
      }
    }
  }
  // set theme to material-ui components
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
  //render base html
  renderHtml () {
    console.log("11111--->", this.props.homestay);
    // Loader template
    if (this.props.homestayLoading) {
        return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
    }else {
      console.log("22222--->", this.props.homestay);
      return (
        <section className="dashboard-content-wrapper view-profile">
          <section className="view-profile-wrapper">
            <div className="header-wrap">Manage Homestay</div>
            {/* Nav tabs */}
            <div className="primary-tabs">

              <ul className="nav nav-tabs" role="tablist">
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

              {/* Tab panes */}
              <div className="tab-content">

                <div role="tabpanel" className="tab-pane active" id="media">
                  <BasicForm homestayId={this.props.homestay._id} homestay={this.props.homestay} />
                </div>
                 <div role="tabpanel" className="tab-pane fade" id="basicSettings">
                     <Blaze template="media" data={this}/>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="priceSettings">
                    < PriceForm homestayId={this.props.homestay._id} homestay={this.props.homestay} />
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="services">
                    < ServiceForm homestayId={this.props.homestay._id} homestay={this.props.homestay} />
                  </div>
              </div>
            </div>
          </section>
        </section>
      )
    }
  }

  render() {
    return this.renderHtml()
  }
};
// To set theme for material-ui components
UpdateHomestay.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
// Import db data
export default createContainer(() => {
  let homestayId = ""
  console.log("FlowRouter", FlowRouter)
  if(FlowRouter.getQueryParam('homestayId')) {
    homestayId = FlowRouter.getQueryParam('homestayId');
  } else {
    console.log("Meteor.user().profile.homestayId", Meteor.user())
    homestayId = Meteor.user().profile.homestayId;
  }
  const HomestayHandle = Meteor.subscribe('homestayDetail', homestayId);
  console.log("homestayId-->", homestayId)
  return {
      currentUser     : Meteor.user(),
      homestayLoading : !HomestayHandle.ready(),
      homestay : Homestays.find({_id:homestayId}).fetch()[0]
  }
}, UpdateHomestay);

// Render Basic detail form
export class BasicForm extends Component {

  constructor(props) {
    super(props);
    if(!this.props.homestay.petTypes) {
      this.props.homestay.petTypes = [];
    }    
    this.state = {
      error : "",
      success : "" ,
      aboutLength  : 360,
      aboutPetLength : 360,
      hobbiesLength  : 360,
    };
  }
  componentDidMount(){
    this.setState({"aboutLength": this.state.aboutLength - this.props.homestay.aboutHomestay.length});
    if(this.props.homestay.aboutPets) {
      this.setState({"aboutPetLength": this.state.aboutPetLength - this.props.homestay.aboutPets.length})
    }
  }
  //submit event of basic detail form
  handleSubmit(event) {
    event.preventDefault();
    var self = this;
   this.setState({'error' : ''})
   this.setState({'success' : ''})
    if(!$(event.currentTarget).find('#aboutHomestay').val() || !$(event.currentTarget).find('#address').val() || !$(event.currentTarget).find('#aboutPets').val())  {
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
      $(event.currentTarget).find('#updateHomestayBtn').prop('disabled',false)
      $(event.currentTarget).find('#addressError').html('')
      $(event.currentTarget).find('#aboutError').html('')
      $(event.currentTarget).find('#aboutPetsError').html('')
      $(event.currentTarget).find('#hobbiesError').html('')
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
          postalCode    = $(event.currentTarget).find('#postalCode').val().trim(),
          aboutHomestay = $(event.currentTarget).find('#aboutHomestay').val().trim(),
          aboutPets     = $(event.currentTarget).find('#aboutPets').val().trim(),
          hobbies       = $(event.currentTarget).find('#hobbies').val().trim(),
          aboutPets     = $(event.currentTarget).find('#aboutPets').val().trim(),
          tenant_gender = $(event.currentTarget).find("input.tenant_gender[type=radio]:checked").val(),
          tenant_smoker = $(event.currentTarget).find("input.tenant_smoker[type=radio]:checked").val();
        var foodRestrictions = [];
        var mealsOptions     = [];
        var petTypes         = [];
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
          name              : name,
          first_name        : first_name,
          last_name         : last_name,
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
          postalCode   		  : postalCode,
          aboutHomestay     : aboutHomestay,
          aboutPets         : aboutPets,
          hobbies           : hobbies,
          aboutPets         : aboutPets,
          tenant_gender     : tenant_gender,
          tenant_smoker     : tenant_smoker,
          updated_at        : new Date(),
          foodRestrictions  : foodRestrictions,
          petTypes          : petTypes,
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
      } else if($(event.currentTarget).hasClass('aboutPets')) {
        $(event.currentTarget).parents('#form-basicDetail').find('#aboutPetsError').html('Please add description about your pets.')
      } else if($(event.currentTarget).hasClass('hobbies')) {
        $(event.currentTarget).parents('#form-basicDetail').find('#hobbiesError').html('Please add description about your hobbies.')
      }

      $(event.currentTarget).addClass('ui-input_state_invalid');
      $(event.currentTarget).parents('#form-basicDetail').find('#updateHomestayBtn').prop('disabled',true)
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
        $(event.currentTarget).parents('#form-basicDetail').find('#updateHomestayBtn').prop('disabled',true)
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
          $(event.currentTarget).parents('#form-basicDetail').find('#updateHomestayBtn').prop('disabled',false)
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
    let pet_types = PetTypes.map(function (pet,index){
      if (index >=1) {
        return (
          <div>
            <label className="col-sm-4 control-label"></label>
            <div className="col-sm-8">
              <div className="custom-checkbox" onClick={self.customCheckbox.bind(this)}>
                <label className={(self.props.homestay.petTypes.indexOf(pet)>-1) ? "active" : ""}>
                  <input type="checkbox" className="pettypes" name="pettypes" value={pet} ref="pettypes" defaultChecked={(self.props.homestay.petTypes.indexOf(pet)>-1) ? "checked" : ""} /> {pet}
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
              placeholder="Eg:-  XXX-XXX-XXXX "
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
          <label htmlFor="foodRestrictions" className="col-sm-4 control-label">Pet Types <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className={(this.props.homestay.petTypes.indexOf(PetTypes[0])>-1) ? "active" : ""}>
                <input type="checkbox" className="pettypes" name="pettypes" value={PetTypes[0]} ref="pettypes" defaultChecked={(this.props.homestay.petTypes.indexOf(PetTypes[0])>-1) ? "checked" : ""} /> {PetTypes[0]}
              </label>
            </div>
          </div>
          {pet_types}
        </div>
        <div className="form-group">
          <label htmlFor="aboutPets" className="col-sm-4 control-label">About Pets <i className="semi">:</i></label>
          <div className="col-sm-8">
            <textarea rows={3} className="form-control aboutPets" id="aboutPets" ref="aboutPets" name="aboutPets" placeholder="Add description about your pets" onBlur={this.textareaValidation.bind(this)} onChange={this.lengthPetsCount.bind(this)} maxLength={360} defaultValue={this.props.homestay.aboutPets}/>
            <span className="ui-hint" id="aboutPetsError"></span>
            <p >{this.state.aboutPetLength} characters remaining</p>
          </div>
        </div> <br />
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
          <label htmlFor="hobbies" className="col-sm-4 control-label">Hobbies <i className="semi">:</i></label>
          <div className="col-sm-8">
            <textarea rows={3} className="form-control hobbies" id="hobbies" ref="hobbies" name="hobbies" placeholder="Add description about your hobbies" onBlur={this.textareaValidation.bind(this)} onChange={this.lengthHobbiesCount.bind(this)} maxLength={360} defaultValue={this.props.homestay.hobbies} />
            <span className="ui-hint" id="hobbiesError"></span>
            <p >{this.state.hobbiesLength} characters remaining</p>
          </div>
        </div> <br />
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

// React component to render price form
export class PriceForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    var self = this;
    this.setState({'error' : ''})
    this.setState({'success' : ''})
    // var dailyPrice = ReactDOM.findDOMNode(this.refs.dailyPrice).value.trim(),
    //     weeklyPrice = ReactDOM.findDOMNode(this.refs.weeklyPrice).value.trim();
    var dailyPrice  = $(event.currentTarget).find('#dailyPrice').val().trim(),
        weeklyPrice = $(event.currentTarget).find('#weeklyPrice').val().trim();
    if(!dailyPrice && !weeklyPrice) {
      self.setState({'error':'No data entered'});
    } else {
      const options = {
        dailyPrice    : Number(dailyPrice),
        weeklyPrice   : Number(weeklyPrice)
      }
      const updateHomestay_args = {
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
  getMessage() {
    if(this.state.error) {
      return(
              <div className="col-sm-8">
                <div className="error-message">{this.state.error} </div>
              </div>
            )
    }
    if (this.state.success) {
      return (
        <div className="col-sm-8">
          <div className="success-message">{this.state.success}</div>
        </div>
      )
    }
  }
  renderPriceform () {
    return (
      <Validation.Form className="form-horizontal" id="form-price" role="form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
        {this.getMessage()}
        </div>
        <div className="form-group">
          <label htmlFor="dailyPrice" className="col-sm-4 control-label">Daily Price ($) <i className="semi">:</i></label>
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
                  errorMessage: 'Only 2 decimal point is allowed.'
                },
                {
                  rule: 'isMinPrice',
                  errorMessage:'Price should be min $1.'
                }
              ]}
              value={(this.props.homestay.dailyPrice)?(this.props.homestay.dailyPrice).toString() : "0"} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="weeklyPrice" className="col-sm-4 control-label">Weekly Price ($) <i className="semi">:</i></label>
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
                  errorMessage: 'Only 2 decimal point is allowed.'
                },
                {
                  rule: 'isMinPrice',
                  errorMessage:'Price should be min $1.'
                }
              ]}
              value={(this.props.homestay.weeklyPrice)? (this.props.homestay.weeklyPrice).toString() : "0"} />
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
  render () {
    return this.renderPriceform()
  }
}


// React component to render service form
export class ServiceForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error : "",
      success : ""
    };
  }

  handleSubmit(event){
    event.preventDefault();
    var self = this;
    var serviceArray = [];
    this.setState({'error' : ''})
    this.setState({'success' : ''})
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

  getMessage() {
    if(this.state.error) {
      return (<div className="col-sm-8">
                            <div className="error-message">{this.state.error} </div>
                          </div>)
    }
    if (this.state.success) {
      return(<div className="col-sm-8">
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
    let luggage = false;
    let wifi = false;
    let cleaning = false;
    let laundry = false;
    let campus = false;
    let city =false;

    if(this.props.homestay.hasOwnProperty("services")) {
      for (var i=0; i< this.props.homestay.services.length; i++) {
        if (this.props.homestay.services[i] === "Weekly Cleaning of Bedroom") {
          cleaning = true
        } else if(this.props.homestay.services[i] === "Will do Laundry for Student") {
          laundry = true
        } else if (this.props.homestay.services[i] === "Free WiFi") {
          wifi = true
        } else if (this.props.homestay.services[i] === "Luggage Storage") {
          luggage = true
        } else if (this.props.homestay.services[i] === "Travel to campus with student on their first day by public transportation") {
          campus = true
        } else if (this.props.homestay.services[i] === "Tour of city in the first week") {
          city = true
        } 
      }
    }
    return (
      <form className="form-horizontal" id="form-services" role="form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
         {this.getMessage()}
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Weekly Cleaning of Bedroom <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className={(cleaning) ? "active" : ""}>
                <input type="checkbox" className="services" name="services[]" value="Weekly Cleaning of Bedroom" ref="services" defaultChecked={(cleaning) ? "checked" : ""} /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Will do Laundry for Student <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className={(laundry) ? "active" : ""}>
                <input type="checkbox" className="services" name="services[]" value="Will do Laundry for Student" ref="services" defaultChecked={(laundry) ? "active" : ""} /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Free WiFi <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className={(wifi) ? "active" : ""}>
                <input type="checkbox" className="services" name="services[]" value="Free Wifi" ref="services" defaultChecked={(wifi) ? "active" : ""} /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Luggage Storage <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className={(luggage) ? "active" : ""}>
                <input type="checkbox" className="services" name="services[]" value="Luggage Storage" ref="services" defaultChecked={(luggage) ? "active" : ""} /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Travel to campus with student on their first day by public transportation <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className={(campus) ? "active" : ""}>
                <input type="checkbox" className="services" name="services[]" value="Travel to campus with student on their first day by public transportation" ref="services" defaultChecked={(campus) ? "active" : ""} /> Yes
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Tour of city in the first week <i className="semi">:</i></label>
          <div className="col-sm-8">
            <div className="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
              <label className={(city) ? "active" : ""}>
                <input type="checkbox" className="services" name="services[]" value="Tour of city in the first week" ref="services" defaultChecked={(city) ? "active" : ""}  /> Yes
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

  render () {
    return this.renderServiceForm()
  }
}



