import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress'
import Dialog           from 'material-ui/Dialog';

var Validation = require('react-validation');
var validator = require('validator');

import { Homestays } from './../../api/homestays/homestays.js';
import { Bookings } from './../../api/booking/bookings.js';
import { CountryList } from './../../helper/constants.js';
import { updateBooking } from './../../api/booking/methods.js';
import { createNewUser, findUser } from './../../api/user/methods.js';


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
          return Boolean(validator.trim(value).length <=10);
      }
    },
    isValidPrice : {
      rule: function(value) {
          return Boolean(validator.trim(value).match(/^\d*(?:\.\d{1,2})?$/));
      }
    }
});

export default class BookRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error           : '',
      success         : ''
    };
  }

  // set theme to material-ui components
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }

  componentDidMount() {
  }
  starRating(){
    let stars = []

    let rate = this.props.homestay.avg_rating || 0
    for(var i = 1;i<=5;i++){
      if(rate >= 1){
        stars.push(<span className="star-full" />)
      }else {
        if(rate > 0)
          stars.push(<span className="star-half" />)
        else
          stars.push(<span className="star-empty" />)
      }
      rate = rate-1
    }
    return (<div className="star-rating">{stars}</div>)
  }
  // Render Book  Room page
  renderBookRoomHtml (){
    if(this.props.bookingLoading) {
      // render loading template
      return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
    } else {
      return (
        <section className="main-content-wrapper common-layout-box">
          <section className="common-layout-box-wrap">
            <div className="header-wrap">{this.props.homestay.name}</div>
            <article className="common-layout-content book-your-room-wrapper">
              <div className="row">
                <div className="col-sm-3">
                  <figure className="homestay-image"><img src={(this.props.homestay.hasOwnProperty("image") && this.props.homestay.image.length)?this.props.homestay.image[0].url:"../images/homes/05.jpg"} alt={this.props.homestay.name} /></figure>
                </div>
                <div className="col-sm-9">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur reprehenderit aliquid nobis tempore, atque dolores repudiandae totam eius repellendus voluptas corrupti veniam possimus, quod quos incidunt est reiciendis iste, molestias.</p>
                  <div className="location"><b>Location:</b> {this.props.homestay.city}, {this.props.homestay.country}</div>
                  <div className="bottom-price">
                    <div className="price-details">CAD {this.props.bookingDetail.paymentAmount}/-</div>
                    {this.starRating()}
                  </div>
                </div>
              </div>
            </article>
          </section> <br />
          < BookRoomForm bookingDetail={this.props.bookingDetail} studentLoading={this.props.studentLoading} studentDetail={this.props.studentDetail} />
        </section>
      )
    }
  }
  render(){
    return this.renderBookRoomHtml()
  }

}

// To set theme for material-ui components
BookRoom.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  let bookingId = FlowRouter.getParam('bookingId');
  
  const BookingHandle  = Meteor.subscribe('bookingDetail', bookingId);
  if (BookingHandle.ready()) {
    let studentDetail = "";
    let studentLoading = false;

    const bookingDetail = Bookings.find().fetch()[0]
    const HomestayHandle = Meteor.subscribe('homestayDetail', bookingDetail.roomId);
    
    if(bookingDetail.ownerRole === "Student") {
      const StudentHandle = Meteor.subscribe('userDetail', bookingDetail.studentId)
      studentDetail = Meteor.users.find({_id: bookingDetail.studentId}).fetch()[0];
      studentLoading = !StudentHandle.ready()
    }
    return {
        currentUser     : Meteor.user(),
        bookingLoading  : !BookingHandle.ready() && !HomestayHandle.ready(),
        homestay        : Homestays.find({_id:bookingDetail.roomId}).fetch()[0],
        bookingDetail   : Bookings.find({_id:bookingId}).fetch()[0],
        studentLoading,
        studentDetail   
    }
  } else {
    return {
        currentUser     : Meteor.user(),
        bookingLoading  : !BookingHandle.ready()
    }
  }
}, BookRoom);

// React Component for BookRoom form
export class BookRoomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error               : "",
      success             : "",
      open                : false  
    };
  }

  // set theme to material-ui components
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
  // Show dropdown
  customSelect(event) {
    $(event.currentTarget).parent().find('.drop-down-list').stop( true, true ).delay(10).slideToggle();
  } 

  componentDidMount() {
      if((this.props.bookingDetail.ownerRole === "Student") && this.props.studentDetail.profile.dateOfBirth) {
          date = this.props.studentDetail.profile.dateOfBirth
      } else {
          date = new Date()
      }
      //datepicker

      setTimeout(function(){ $('#DOB').datetimepicker({
          format : 'YYYY-MM-DD',
          defaultDate: date,
          maxDate : new Date() // enable only dates 2 weeks after current date
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
    var studentName = $(event.currentTarget).find('#studentName').val().trim(),
      email         = $(event.currentTarget).find('#email').val().trim(),
      mobile        = $(event.currentTarget).find('#phone').val().trim(),
      gender        = $(event.currentTarget).find("input.gender[type=radio]:checked").val(),
      country       = $(event.currentTarget).find('#country').val().trim(),
      dateOfBirth   = $(event.currentTarget).find('#DOB').val().trim(),
      smoker        = $(event.currentTarget).find("input.smoker[type=radio]:checked").val(),
      pets          = $(event.currentTarget).find("input.pets[type=radio]:checked").val(),
      lengthOfStay  = $(event.currentTarget).find('#lengthStay').val().trim(),
      purposeOfStay = $(event.currentTarget).find('#purposeStay').val().trim();
    if(!dateOfBirth) {
      this.setState({"error": "Enter Date Of Birth"})
    } else {
      var bookingDetail = {
        name          : studentName,
        email         : email,
        gender        : gender,
        country       : country,
        dateOfBirth   : new Date(dateOfBirth),
        smoker        : smoker,
        pets          : pets,
        lengthOfStay  : lengthOfStay,
        purposeOfStay : purposeOfStay,
        bookingStatus : 0,
        multipleChoice: false,
        currentChoice : 1
      }
      
      if(this.props.bookingDetail.ownerRole === "Student") {
        // Function call to update booking collection
        updateBooking.call({bookingId:this.props.bookingDetail._id, bookingDetail}, (error, response) => {
          if(error){
            self.setState({'error':error.reason});
          } else {
            // if(this.props.bookingDetail.searchIndex) {
              FlowRouter.go('/confirmbooking/'+self.props.bookingDetail._id)
            // } else {
            //   FlowRouter.go('/payment/'+self.props.bookingDetail._id)
            // }
          }
        })
      } else {
        let firstName       = studentName.split(' ')[0],
            lastName        = (studentName.split(' ')[1])?studentName.split(' ')[1]:"",
            role            = "Student",
            status          = 'active';

        let password = Random.secret([6]);
        // create user
        let userData = {
          email: email.toLowerCase(),
          password: password,
          profile:{
              firstName   : firstName,
              lastName    : lastName,
              name        : firstName+' '+lastName,
              email       : email,
              role        : role,
              status      : status,
              country     : country,
              mobile      : Number(mobile),
              dateOfBirth : new Date(dateOfBirth), 
              gender      : gender
          }
        }
        // Function call to check whether user already exists
        findUser.call({email : userData.email}, (error, user) =>{
          if (error) {
            self.setState({'error':error.reason});
          } else {
            if (user) {
              this.setState({"open":true});
            } else {
              // Method for create new user
              createNewUser.call(userData, (error, res)=> {
                if (error) {
                    console.log(error)
                    self.setState({'error':error.reason});
                } else {
                    bookingDetail["studentId"] = res;
                    // Function call to update booking detail
                    updateBooking.call({bookingId:this.props.bookingDetail._id, bookingDetail}, (error, response) => {
                      if(error){
                        self.setState({'error':error.reason});
                      } else {
                        var options = {}

                        options['subject'] = 'OurHomeStay - Account Created'
                        options['message'] = 'New accout created. Try Login with the given password and change your password. Password : '+password

                        options['recipient'] = email;
                        params  = {
                          recipient_name : firstName+' '+lastName, 
                          link : "http://52.42.62.56:3000/"
                        };
                        options['params'] = params;
                        options['mail_template'] = "notification";

                        // Method for send email
                        Meteor.call("sendMail", options, function (error) {
                          if(error){
                            self.setState({'error':'Sorry!. Failed to send mail.'});
                          }else{
                            console.log('Successfully created new account and send mail to user.')
                            // if(self.props.bookingDetail.searchIndex) {
                              FlowRouter.go('/confirmbooking/'+self.props.bookingDetail._id)
                            // } else {
                            //   FlowRouter.go('/payment/'+self.props.bookingDetail._id)
                            // }
                          }
                        })
                      }
                    })
                }
              })
            }
          }
        })
      }
    }
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
  // Function to open modal
  handleOpen() {
      this.setState({open: true});     
  }
  // Function to close modal
  handleClose() {
      this.setState({open: false});
  }
  clearForm (event) {
    event.preventDefault();
    document.getElementById("bookingForm").reset();

  }
  renderStudentForm() {
    let _this = this;
    let options = CountryList.map(function (country,index){
        return (
            <option key={index} value={country}>{country}</option>
        )
      });
    if(this.props.bookingDetail.ownerRole === "Agency") {
      return (<Validation.Form className="form-horizontal" role="form" id="bookingForm" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                {this.getErrorMessage()}
              </div>
              <div className="form-group">
                <label htmlFor="studentName" className="col-sm-3 control-label">Student Name <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Input 
                    type="text" 
                    className="form-control" 
                    id="studentName" 
                    name="studentName" 
                    blocking='input'
                    validations={[
                      {
                        rule: 'isRequired',
                        errorMessage: 'Please enter your Name'
                      }
                    ]}
                    placeholder="Enter Your Name" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Gender <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <div className="radio-switch">
                    <label className="active" onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" className="gender" name="gender" defaultValue="Male" defaultChecked="checked" /> Male
                    </label>
                    <label onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" className="gender" name="gender" defaultValue="Female"/> Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="col-sm-3 control-label">Email ID <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <fieldset disabled={(this.props.studentDetail)? "disabled" : ""} >
                    <Validation.Input 
                      type="email" 
                      className="form-control" 
                      id="email"
                      name="email"
                      blocking='input'
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
                    value= {(this.props.studentDetail) ? this.props.studentDetail.profile.country : "Canada" } 
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
                    <label className="active" onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="smoker" className="smoker" ref="smoker" defaultValue="No" defaultChecked="checked" /> No
                    </label>
                    <label onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="smoker" className="smoker" ref="smoker" defaultValue="Yes" /> Yes
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Pets <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <div className="radio-switch">
                    <label className="active" onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="pets" className="pets" ref="pets" defaultValue="No" defaultChecked="checked" /> No
                    </label>
                    <label onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="pets" className="pets" ref="pets" defaultValue="Yes" /> Yes
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="lengthStay" className="col-sm-3 control-label">Length of Stay in {(this.props.bookingDetail.bookingType==="dayBooking")? "Days" : "Weeks"} <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <Validation.Input
                    type="text" 
                    name= "lengthStay"
                    className="form-control" 
                    id="lengthStay" 
                    placeholder="In weeks"
                    blocking='input'
                    readOnly
                    value = {(this.props.bookingDetail.lengthOfStay).toString()}
                    validations={[
                    {
                      rule: 'isRequired',
                      errorMessage: 'Please enter length of stay'
                    },
                    {
                      rule: 'isNumber',
                      errorMessage: 'Enter a valid length of stay'
                    }
                  ]} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="puposeStay" className="col-sm-3 control-label">Purpose of Stay<i className="semi">:</i></label>
                <div className="col-sm-8">
                  <textarea rows={3} className="form-control" id="purposeStay" name="purposeStay" placeholder="Enter some purpose of your stay" defaultValue={""} />
                </div>
              </div>
              <br />
              <div className="form-group">
                <div className="col-sm-3" />
                <div className="col-sm-8">
                  {/*<a href="confirm-booking.html" className="btn primary-btn">Proceed</a>*/}
                  {/*<button class="btn primary-btn">Proceed</button>*/}
                  <Validation.Button className="btn primary-btn" value="Proceed" />
                  {/*<button className="btn cancel-btn" onClick={this.clearForm.bind(this)}>Cancel</button>*/}

                </div>
              </div>
            </Validation.Form>
            )
    } else {
      return(
      <Validation.Form className="form-horizontal" role="form" id="bookingForm" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                {this.getErrorMessage()}
              </div>
              <div className="form-group">
                <label htmlFor="studentName" className="col-sm-3 control-label">Student Name <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <Validation.Input 
                    type="text" 
                    className="form-control" 
                    id="studentName" 
                    name="studentName" 
                    blocking='input'
                    validations={[
                      {
                        rule: 'isRequired',
                        errorMessage: 'Please enter your Name'
                      }
                    ]}
                    value = {(this.props.studentDetail)? this.props.studentDetail.profile.name : ""}
                    placeholder="Enter Your Name" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Gender <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <div className="radio-switch">
                   <label className={(this.props.studentDetail.profile.hasOwnProperty("gender"))?(this.props.studentDetail.profile.gender === "Male")?"active":"":"active"} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" className="gender" name="gender" defaultValue="Male" defaultChecked={(this.props.studentDetail.profile.hasOwnProperty("gender"))?(this.props.studentDetail.profile.gender === "Male")?"checked":"":"checked"} /> Male
                    </label>
                    <label className={(this.props.studentDetail.profile.gender === "Female")?"active":""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" className="gender" name="gender" defaultValue="Female" defaultChecked={(this.props.studentDetail.profile.gender === "Female")?"checked":""} /> Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="col-sm-3 control-label">Email ID <i className="semi">:</i></label>
                <div className="col-sm-8">
                  <fieldset disabled={(this.props.studentDetail)? "disabled" : ""} >
                    <Validation.Input 
                      type="email" 
                      className="form-control" 
                      id="email"
                      name="email"
                      blocking='input'
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
                      value =  {(this.props.studentDetail) ? this.props.studentDetail.emails[0].address : "" }
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
                    value =  {(this.props.studentDetail) ? (this.props.studentDetail.profile.mobile).toString() : "" }
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
                    value= {(this.props.studentDetail) ? this.props.studentDetail.profile.country : "Canada" } 
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
                    <label className={(this.props.studentDetail.profile.smoker ==="No")?"active":""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="smoker" className="smoker" ref="smoker" defaultValue="No" defaultChecked={(this.props.studentDetail.profile.smoker ==="No")?"checked":""} /> No
                    </label>
                    <label className={(this.props.studentDetail.profile.smoker ==="Yes")?"active":""} onClick={this.radioSwitch.bind(this)} >
                      <input type="radio" name="smoker" className="smoker" ref="smoker" defaultValue="Yes" defaultChecked={(this.props.studentDetail.profile.smoker === "Yes")?"checked":""} /> Yes
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Pets <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <div className="radio-switch">
                    <label className={(this.props.studentDetail.profile.pets === "No")?"active":""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="pets" className="pets" ref="pets" defaultValue="No" defaultChecked={(this.props.studentDetail.profile.pets === "No")?"checked":""} /> No
                    </label>
                    <label className={(this.props.studentDetail.profile.pets === "Yes")?"active":""} onClick={this.radioSwitch.bind(this)}>
                      <input type="radio" name="pets" className="pets" ref="pets" defaultChecked={(this.props.studentDetail.profile.pets === "Yes")?"checked":""} defaultValue="Yes" /> Yes
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="lengthStay" className="col-sm-3 control-label">Length of Stay in {(this.props.bookingDetail.bookingType==="dayBooking")? "Days" : "Weeks"} <i className="semi">:</i></label>
                <div className="col-sm-3">
                  <Validation.Input
                    type="text" 
                    name= "lengthStay"
                    className="form-control" 
                    id="lengthStay" 
                    placeholder="In weeks"
                    blocking='input'
                    value = {(this.props.bookingDetail.lengthOfStay).toString()}
                    readOnly
                    validations={[
                    {
                      rule: 'isRequired',
                      errorMessage: 'Please enter length of stay'
                    },
                    {
                      rule: 'isNumber',
                      errorMessage: 'Enter a valid length of stay'
                    }
                  ]} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="puposeStay" className="col-sm-3 control-label">Purpose of Stay<i className="semi">:</i></label>
                <div className="col-sm-8">
                  <textarea rows={3} className="form-control" id="purposeStay" name="purposeStay" placeholder="Enter some purpose of your stay" defaultValue={""} />
                </div>
              </div>
              <br />
              <div className="form-group">
                <div className="col-sm-3" />
                <div className="col-sm-8">
                  {/*<a href="confirm-booking.html" className="btn primary-btn">Proceed</a>*/}
                  {/*<button class="btn primary-btn">Proceed</button>*/}
                  <Validation.Button className="btn primary-btn" value="Proceed" />
                  {/*<button className="btn cancel-btn" onClick={this.clearForm.bind(this)}>Cancel</button>*/}

                </div>
              </div>
            </Validation.Form>
      )
    }
  }
  renderForm() {
    
    if(this.props.studentLoading) {
      return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
    } else {
      let readOnly = "";
      if(this.props.studentDetail) {
        readOnly = "readonly"
      }
      const actions = [
            <button className="btn cancel-btn" onClick= {this.handleClose.bind(this)} > Ok </button>,
          ];
      return (
        <section className="common-layout-box-wrap">
            <Dialog
                title="User Already Exist"
                actions={actions}
                modal={true}
                open={this.state.open}
            >
                <div className="header-wrap">Email id already registerd as a Student, DO you want to continue with the same Student profile. If no , Please enter a new Email address.</div>
            </Dialog>
          <div className="header-wrap">Student Form</div>
          <article className="common-layout-content students-form">
            {this.renderStudentForm()}
          </article>
        </section>
      )
    }
  }
  render() {
    return this.renderForm()
  }
}

BookRoomForm.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
