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
import { Payments } from './../../api/payment/payments.js';
import { Bookings } from './../../api/booking/bookings.js';
import { MonthList } from './../../helper/constants.js';
import { YearList } from './../../helper/constants.js';
import { createNewUser, findUser } from './../../api/user/methods.js';
import { updatePayment } from './../../api/payment/methods.js';
import { newPayment } from './../../api/payment/methods.js';
import { updateBooking } from './../../api/booking/methods.js';

// Extend Validation with custom rules
Validation.extendErrors({
    isRequired: {
        className: 'ui-input_state_empty',
        message: 'required',
        rule: function(value) {
            return Boolean(validator.trim(value));
        }
    },
    isCardNumber : {
      rule: function(value) {
            return Boolean(validator.trim(value).match(/^[x0-9\s]+$/));
        }
    }
});

export default class PaymentPage extends Component {
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
  renderStudentDetail () {
  	if( this.props.student) {
  		return (
  			<div className="details-students">
                <div className="header-wrap">Students Details</div>
                <div className="details-wrap-stays">
                  <h4>{this.props.student.profile.name}</h4>
                  <p><b>Phone:</b> {this.props.student.profile.mobile}</p>
                  <p><b>Email:</b> {this.props.student.emails[0].address}</p>
                  <p><b>Length of Stay:</b> {this.props.bookingDetail.lengthOfStay} {(this.props.bookingDetail.bookingType==="dayBooking")?"Days":"Weeks"}</p>
                  <p><b>Location:</b> {this.props.student.profile.country}</p>
                </div>
            </div>
  		)
  	} else {
  		return (
            <div>
                <center>
                    <CircularProgress size={1.5} color="#272b35" />
                </center>
            </div>
        )
  	}
  }
  renderHomestayDetail (){
  	if(this.props.homestay) {
  		return (
  			<div className="details-homestay">
	            <div className="header-wrap">Homestay Details</div>
	            <figure className="homestay-details-image">
	              <img src={(this.props.homestay.hasOwnProperty("image") && this.props.homestay.image.length)?this.props.homestay.image[0].url:"../images/homes/05.jpg"} alt={this.props.homestay.name} />
	            </figure>
	            <div className="details-wrap-stays">
	              <h4>{this.props.homestay.name}</h4>
	              <p><b>Phone:</b> {this.props.homestay.phone}</p>
	              <p><b>Email:</b> {this.props.homestay.email}</p>
	              <p><b>Number of Rooms/Beds:</b> {this.props.homestay.roomsNumber}</p>
	              <p><b>Location:</b> {this.props.homestay.city}, {this.props.homestay.country}</p>
	              <p><b>Amount:</b> CAD {this.props.bookingDetail.paymentAmount}/-</p>
	            </div>
          	</div>
  		)
  	}else {
  		return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
  	}
  }
  renderPaymentPage () {
  	if(this.props.bookingLoading) {
  		return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
  	} else {
  		console.log(this.props.bookingLoading)
  		console.log(this.props.student)
  		return (
	  		<section className="main-content-wrapper common-layout-box">
		        <div className="two-col-layout">
		          <div className="row">
		            <div className="col-sm-7">
		              {this.renderHomestayDetail()}
		            </div>
		            <div className="col-sm-5">
		              {this.renderStudentDetail()}
		            </div>
		          </div>
		        </div>
		        < PaymentForm studentDetail={this.props.student} bookingDetail={this.props.bookingDetail} card={this.props.card} cardLoading={this.props.cardLoading} currentUser={this.props.currentUser} homestay={this.props.homestay}/>
		    </section>
		)
  	}
  }
  render() {
  	return this.renderPaymentPage()
  }
}
// To set theme for material-ui components
PaymentPage.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  let bookingId = FlowRouter.getParam('bookingId');

  const BookingHandle  = Meteor.subscribe('bookingDetail', bookingId);
  if (BookingHandle.ready()) {

    const bookingDetail = Bookings.find().fetch()[0];
    const HomestayHandle = Meteor.subscribe('homestayDetail', bookingDetail.roomId);
    const StudentHandle = Meteor.subscribe('users', bookingDetail.studentId);
    const CardHandler = Meteor.subscribe('cards')
    const userHandler = Meteor.subscribe('userDetail')
    console.log("bookingDetail")
    console.log(bookingDetail)
    return {
        currentUser     : Meteor.user(),
        bookingLoading  : !BookingHandle.ready() && !HomestayHandle.ready() && !StudentHandle.ready(),
        homestay        : Homestays.find({_id:bookingDetail.roomId}).fetch()[0],
        bookingDetail   : Bookings.find({_id:bookingId}).fetch()[0],
        studentLoading  : !StudentHandle.ready(),
        student         : Meteor.users.find({_id: bookingDetail.studentId}).fetch()[0],
        card            : Cards.findOne(),
        cardLoading     : !CardHandler.ready()
    }
  } else {
    return {
        currentUser     : Meteor.user(),
        bookingLoading  : !BookingHandle.ready()
    }
  }
}, PaymentPage);

// React Component for BookRoom form
export class PaymentForm extends Component {
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
	handleSubmit(event) {
		event.preventDefault();
	    this.setState({'error':''});
	    this.setState({'success':''});
	    $(event.currentTarget).find('#paymentButton').prop('disabled',true)
	    var currentElement = $(event.currentTarget)
	    var self = this;
	    let cardName 	= $(event.currentTarget).find('#cardName').val().trim(),
	      cardNumber    = $(event.currentTarget).find('#cardNumber').val().trim(),
	      cvv        	= $(event.currentTarget).find('#cvv').val().trim(),
	      expMonth    	= $(event.currentTarget).find("#expMonth").val().trim(),
	      expYear     	= $(event.currentTarget).find('#expYear').val().trim();
	    let cardDetails = {
	    	cardName,
	    	cardNumber,
	    	cvv,
	    	expMonth,
	    	expYear
	    };
	    let options ={};
	    let email_options={};
	    let today = "";
	    let processStartTime = "";
	    let userId = this.props.studentDetail._id;
        let paymentData = {
        	orderId         : this.props.bookingDetail._id,
        	roomId 			: this.props.bookingDetail.roomId,
        	roomType 		: this.props.bookingDetail.roomType,
        	userId   		: this.props.bookingDetail.ownerId,
        	userRole 		: Meteor.user().roles[0],
        	paymentAmount 	: this.props.bookingDetail.paymentAmount,
        	paymentStatus   : -1
        }
	    var card_exist = this.props.card;
        if(card_exist){
        	console.log(this.props.currentUser)
        	today = new Date();
			processStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), 0, 0);
        	let bookingArg = {
        		customerId : self.props.currentUser.stripe.customerId,
        		paymentStatus : 0,
        		processStartTime
        	}
        	updateBooking.call({bookingId:self.props.bookingDetail._id, bookingDetail:bookingArg}, (error, response) => {
				if(error){
		            self.setState({'error':error.reason});
	          	} else {
	          		options ={}

	                options['subject'] = 'OurHomeStay - Booking Successfull'
					options['message'] = 'Booking Successfull. Your booking for '+self.props.homestay.name+' is successfull. Wait fo confirmation message after proccessing is completed'

					options['recipient'] =  self.props.currentUser.emails[0].address;
					params  = {
						recipient_name :  self.props.currentUser.profile.name,
						link : "http://52.42.62.56:3000/"
					};
					options['params'] = params;
					options['mail_template'] = "notification";



	                // Method for send email
	                Meteor.call("sendMail", options, function (error) {
	                  if(error){
	                    console.log(error)
	                  }
	                })

	                options['subject'] = 'OurHomeStay - User Booked'
					options['message'] = 'Booking Successfull. '+self.props.currentUser.profile.name+' has made a booking. Check your profile for more details.'

					options['recipient'] = self.props.homestay.email;
					params  = {
						recipient_name : self.props.homestay.name,
						link : "http://52.42.62.56:3000/"
					};
					options['params'] = params;
					options['mail_template'] = "notification";

	                // Method for send email
	                Meteor.call("sendMail", options, function (error) {
	                  if(error){
	                    console.log(error)
	                  }
	                })
	                paymentData["customerId"] = self.props.currentUser.stripe.customerId;
	                newPayment.call(paymentData, (error, data) => {
						if(error){
							console.log(error)
							self.setState({'error':error.reason});
						} else {
							email_options['subject'] = 'OurHomeStay - Payment'
							email_options['message'] = 'Payment will be processed one week before arrival date.'

							email_options['recipient'] = self.props.currentUser.emails[0].address;
							params  = {
								recipient_name : self.props.currentUser.profile.name,
								link : "http://52.42.62.56:3000/"
							};
							email_options['params'] = params;
							email_options['mail_template'] = "notification";
							Meteor.call("sendMail", email_options, function (error) {
			                  if(error){
			                    console.log(error)
			                  }
			                })
							$(event.currentTarget).find('#paymentButton').prop('disabled',false)
							FlowRouter.go('/bookingcompleted')
						}
					})

				}
			})


			// // call meteor method for direct stripe payment
			// // input: user stripeid,amount,paymane data (for payment collection)

			// Meteor.call('stripeDirectPayment',self.props.currentUser.stripe.customerId,paymentData.paymentAmount,paymentData,this.props.homestay.userId,function (error, res) {
			//   	if (error) {
			//   		console.log(error)
			//   		self.setState({'error':error.reason})
			//   		$(event.currentTarget).find('#paymentButton').prop('disabled',false)
			//     } else {
			//     	console.log(res)
			//     	if(res.error){
			//     		self.setState({'error':res.message})
			//   			$(event.currentTarget).find('#paymentButton').prop('disabled',false)
			//     	}else {
			// 	    	let paymentArg = "";
			// 	    	let bookingArg = "";
			// 		    if(res.res.paid) {
			// 		    	paymentArg = {paymentStatus : 1};
			// 		    	bookingArg = {paymentStatus : true};
			// 		    } else {
			// 		    	paymentArg = {paymentStatus : 0};
			// 		    	bookingArg = {paymentStatus : false};
			// 		    }
			// 		    updateBooking.call({bookingId:self.props.bookingDetail._id, bookingDetail:bookingArg}, (error, response) => {
			// 				if(error){
			// 		            self.setState({'error':error.reason});
			// 	          	} else {
			// 				    updatePayment.call({paymentId:res.payment, options:paymentArg}, (error, data) => {
			// 						if(error){
			// 							console.log(error)
			// 							self.setState({'error':error.reason});
			// 							$(event.currentTarget).find('#paymentButton').prop('disabled',false)
			// 						} else {
			// 							console.log(data)
			// 							var options = {}

			// 			                options['subject'] = 'OurHomeStay - Payment Successfull'
			// 			                options['message'] = 'Payment Successfull. Thank You for booking through OurHomeStay.'
			// 			                options['email']   = self.props.currentUser.emails[0].address
			// 			                // Method for send email
			// 			                Meteor.call("sendMail", options, function (error) {
			// 			                  if(error){
			// 			                    console.log(error)
			// 			                  }
			// 			                })
			// 			                options['subject'] = 'OurHomeStay - Booking Successfull'
			// 			                options['message'] = 'Booking Successfull. Your booking for '+self.props.homestay.name+' is successfull. Wait fo confirmation message after proccessing is completed'
			// 			                options['email']   = self.props.currentUser.emails[0].address
			// 			                // Method for send email
			// 			                Meteor.call("sendMail", options, function (error) {
			// 			                  if(error){
			// 			                    console.log(error)
			// 			                  }
			// 			                })
			// 			                options['subject'] = 'OurHomeStay - User Booked'
			// 			                options['message'] = 'Booking Successfull. '+self.props.currentUser.profile.name+' has made a booking. Check your profile for more details.'
			// 			                options['email']   = self.props.homestay.email
			// 			                // Method for send email
			// 			                Meteor.call("sendMail", options, function (error) {
			// 			                  if(error){
			// 			                    console.log(error)
			// 			                  }
			// 			                })
			// 							FlowRouter.go('/bookingcompleted')
			// 						}
			// 					});
			// 				}
			// 			})
			// 		}
			// 	}
			// })



        } else {
            // get card deatils
            var Card = {
                number: cardNumber,
                exp_month: expMonth,
                exp_year: expYear,
                cvc: cvv,
                name: cardName
            };
            // generate stripe token
            STRIPE.getToken(Card, function (card) {
            	console.log(card)
                if (card.error) {
                	self.setState({'error': card.error.message})
                	$(event.currentTarget).find('#paymentButton').prop('disabled',false)
                } else {
                    let token = card.id;
                    let cardId = card.card.id
                    // call function to create a new stripe customer
                	Meteor.call('stripeCreateCustomer', token, cardId, function (error, response) {
                		if(error) {

                			$(event.currentTarget).find('#paymentButton').prop('disabled',false)
                		} else {
                			today = new Date();
							processStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), 0, 0);
                			let bookingArg = {
				        		customerId : response.id,
				        		paymentStatus : 0,
				        		processStartTime
				        	}
				        	updateBooking.call({bookingId:self.props.bookingDetail._id, bookingDetail:bookingArg}, (error, booking) => {
								if(error){
						            self.setState({'error':error.reason});
						            $(event.currentTarget).find('#paymentButton').prop('disabled',false);
					          	} else {
					          		options ={}

					                options['subject'] = 'OurHomeStay - Booking Successfull'
									options['message'] = 'Booking Successfull. Your booking for '+self.props.homestay.name+' is successfull. Wait for confirmation message after proccessing is completed'

									options['recipient'] = self.props.currentUser.emails[0].address;
									params  = {
										recipient_name : self.props.currentUser.profile.name,
										link : "http://52.42.62.56:3000/"
									};
									options['params'] = params;
									options['mail_template'] = "notification";

					                // Method for send email
					                Meteor.call("sendMail", options, function (error) {
					                  if(error){
					                    console.log(error)
					                  }
					                })

					                options['subject'] = 'OurHomeStay - User Booked'
									options['message'] = 'Booking Successfull. '+self.props.currentUser.profile.name+' has made a booking. Check your profile for more details.'

									options['recipient'] = self.props.homestay.email;
									params  = {
										recipient_name : self.props.homestay.name,
										link : "http://52.42.62.56:3000/"
									};
									options['params'] = params;
									options['mail_template'] = "notification";

					                // Method for send email
					                Meteor.call("sendMail", options, function (error) {
					                  if(error){
					                    console.log(error)
					                  }
					                })
					                paymentData["customerId"] = response.id;
					                newPayment.call(paymentData, (error, data) => {
										if(error){
											console.log(error)
											self.setState({'error':error.reason});
											$(event.currentTarget).find('#paymentButton').prop('disabled',false);
										} else {
											email_options['subject'] = 'OurHomeStay - Payment'
											email_options['message'] = 'Payment will be processed one week before arrival date.'

											email_options['recipient'] = self.props.currentUser.emails[0].address;
											params  = {
												recipient_name : self.props.currentUser.profile.name,
												link : "http://52.42.62.56:3000/"
											};
											email_options['params'] = params;
											email_options['mail_template'] = "notification";
											Meteor.call("sendMail", email_options, function (error) {
							                  if(error){
							                    console.log(error)
							                  }
							                })
											$(event.currentTarget).find('#paymentButton').prop('disabled',false)
											FlowRouter.go('/bookingcompleted')
										}
									})
								}
							})


							// // call meteor method for direct stripe payment
							// // input: user stripeid,amount,paymane data (for payment collection)
							// Meteor.call('stripeDirectPayment',response.id,paymentData.paymentAmount,paymentData,function (error, res) {
							//   	if (error) {
							//   		console.log(error)
							//   		self.setState({'error': error.message})
							//   		$(event.currentTarget).find('#paymentButton').prop('disabled',false)
							//         // newCustomer.return(error);
							//     } else {
							//     	if(res.error){
							//     		self.setState({'error':res.message})
							//   			$(event.currentTarget).find('#paymentButton').prop('disabled',false)
							//     	}else {
							// 		    let paymentArg = "";
							// 		    let bookingArg = "";
							// 		    if(res.res.paid) {
							// 		    	paymentArg = {paymentStatus : 1};
							// 		    	bookingArg = {paymentStatus : true};
							// 		    } else {
							// 		    	paymentArg = {paymentStatus : 0};
							// 		    	bookingArg = {paymentStatus : true};
							// 		    }
							// 		    updateBooking.call({bookingId:self.props.bookingDetail._id, bookingDetail:bookingArg}, (error, response) => {
							// 				if(error){
							// 		            self.setState({'error':error.reason});
							// 	          	} else {
							// 				    updatePayment.call({paymentId:res.payment, options:paymentArg}, (error, data) => {
							// 						if(error){
							// 							self.setState({'error':error.reason});
							// 							$(event.currentTarget).find('#paymentButton').prop('disabled',false)
							// 						} else {
							// 							console.log(data)
							// 							console.log(data)
							// 							var options = {}

							// 			                options['subject'] = 'OurHomeStay - Payment Successfull'
							// 			                options['message'] = 'Payment Successfull. Thank You for booking through OurHomeStay.'
							// 			                options['email']   = self.props.currentUser.emails[0].address
							// 			                // Method for send email
							// 			                Meteor.call("sendMail", options, function (error) {
							// 			                  if(error){
							// 			                    console.log(error)
							// 			                  }
							// 			                })
							// 			                options['subject'] = 'OurHomeStay - Booking Successfull'
							// 			                options['message'] = 'Booking Successfull. Your booking for '+self.props.homestay.name+' is successfull. Wait fo confirmation message after proccessing is completed'
							// 			                options['email']   = self.props.currentUser.emails[0].address
							// 			                // Method for send email
							// 			                Meteor.call("sendMail", options, function (error) {
							// 			                  if(error){
							// 			                    console.log(error)
							// 			                  }
							// 			                })
							// 			                options['subject'] = 'OurHomeStay - User Booked'
							// 			                options['message'] = 'Booking Successfull. '+self.props.currentUser.profile.name+' has made a booking. Check your profile for more details.'
							// 			                options['email']   = self.props.homestay.email
							// 			                // Method for send email
							// 			                Meteor.call("sendMail", options, function (error) {
							// 			                  if(error){
							// 			                    console.log(error)
							// 			                  }
							// 			                })
							// 							FlowRouter.go('/bookingcompleted')
							// 						}
							// 					});
							// 				}
							// 			})
							// 		}
						 //        }
							// })



                		}
                	})
                }
            })
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
	renderPaymentForm() {
		let months = MonthList.map(function (month,index){
			if(month!=="Month") {
		        return (
		            <option key={index} value={month}>{month}</option>
		        )
		    } else {
		    	return (
		            <option key={index} value="">{month}</option>
		        )
		    }
	    });
	    let years = YearList.map(function (year,index){
	    	if(year!=="Year") {
		        return (
		            <option key={index} value={year}>{year}</option>
		        )
		    } else {
		    	return (
		            <option key={index} value="">{year}</option>
		        )
		    }
	    });
		if (this.props.cardLoading) {
			return (
                <div>
                    <center>
                        <CircularProgress size={1.5} color="#272b35" />
                    </center>
                </div>
            )
		}else {
			if(this.props.card) {
				return(
					<section className="common-layout-box-wrap">
			          <div className="header-wrap">Credit Card Details</div>
			          <article className="common-layout-content students-form">
			            <Validation.Form className="form-horizontal" role="form" id="paymentForm" onSubmit={this.handleSubmit.bind(this)}>
			              <div className="form-group">
			              	{this.getErrorMessage()}
			              </div>
			              <div className="form-group">
			                <label htmlFor="Name" className="col-sm-3 control-label">Name <i className="semi">:</i></label>
			                <div className="col-sm-8">
			                <fieldset disabled="disabled" >
			                  <Validation.Input
			                  	type="text"
			                  	className="form-control"
			                  	name = "cardName"
			                  	id="cardName"
			                  	ref= "cardName"
			                  	value={this.props.card.name}
			                  	validations={[
			                      {
			                        rule: 'isRequired',
			                        errorMessage: 'Please enter Card Name'
			                      }
			                    ]}
			                  	placeholder="Enter Card Name" />
			                </fieldset>
			                </div>
			              </div>
			              <div className="form-group">
			                <label htmlFor="number" className="col-sm-3 control-label">Card Number <i className="semi">:</i></label>
			                <div className="col-sm-8">
				                <fieldset disabled="disabled"  >
				                  <Validation.Input
				                  	type="text"
				                  	className="form-control"
				                  	id="cardNumber"
				                  	name="cardNumber"
				                  	ref="cardNumber"
				                  	value={"xxxx xxxx xxxx "+this.props.card.last4}
				                  	validations={[
				                      {
				                        rule: 'isRequired',
				                        errorMessage: 'Please enter card number'
				                      },
				                      {
				                        rule: 'isCardNumber',
				                        errorMessage: 'Enter a valid card number'
				                      }
				                    ]}
				                  	placeholder="Enter Card Number" />
				                </fieldset>
			                </div>
			              </div>
			              <div className="form-group">
			                <label htmlFor="cvv" className="col-sm-3 control-label">CVV <i className="semi">:</i></label>
			                <div className="col-sm-2">
			                <fieldset disabled="disabled" >
			                  <Validation.Input
				                type="text"
				                className="form-control"
				                id="cvv"
				                name="cvv"
				                ref="cvv"
				                value={"xxx"}
				                validations={[
			                      {
			                        rule: 'isRequired',
			                        errorMessage: 'Please enter your cvv'
			                      },
			                      {
			                        rule: 'isCardNumber',
			                        errorMessage: 'Enter a valid cvv'
			                      }
			                    ]}
				                placeholder="CVV" />
				             </fieldset>
			                </div>
			              </div>
			              <div className="form-group">
			                <label htmlFor="valid" className="col-sm-3 control-label">Valid Thru <i className="semi">:</i></label>
			                <div className="col-sm-3">
			                	<fieldset disabled="disabled"  >
				                  <Validation.Select
				                    value= {this.props.card.exp_month}
				                    id="expMonth"
				                    className="form-control"
				                    ref="expMonth"
				                    name="expMonth"
				                    validations={[
				                      {
				                        rule: 'isRequired',
				                        errorMessage: 'Please Select valid month'
				                      }
				                    ]}>
				                    {months}
				                  </Validation.Select>
				                 </fieldset>
			                </div>
			                <div className="col-sm-3">
				                <fieldset disabled="disabled">
				                   <Validation.Select
				                    className="form-control"
				                   	value= {this.props.card.exp_year}
				                   	id = "expYear"
				                   	name = "expYear"
				                   	ref = "expYear"
				                   	validations={[
				                      {
				                        rule: 'isRequired',
				                        errorMessage: 'Please select Exp-Year'
				                      }
				                    ]}
				                   	placeholder="YY">
				                    {years}
				                  </Validation.Select>
				                </fieldset>
			                </div>
			              </div>
			              <div className="row">
				              <div className="col-sm-12">
				              	<Validation.Button className="btn primary-btn" id="paymentButton" value="Submit Request" />
				              </div>
				          </div>
			            </Validation.Form>
			            <br />
			          </article>
			        </section>
				)
			} else {
				return(
				<section className="common-layout-box-wrap">
			          <div className="header-wrap">Credit Card Details</div>
			          <article className="common-layout-content students-form">
			            <Validation.Form className="form-horizontal" role="form" id="paymentForm" onSubmit={this.handleSubmit.bind(this)}>
			              <div className="form-group">
			              	{this.getErrorMessage()}
			              </div>
			              <div className="form-group">
			                <label htmlFor="Name" className="col-sm-3 control-label">Name <i className="semi">:</i></label>
			                <div className="col-sm-8">
			                <fieldset disabled="" >
			                  <Validation.Input
			                  	type="text"
			                  	className="form-control"
			                  	name = "cardName"
			                  	id="cardName"
			                  	ref= "cardName"
			                  	validations={[
			                      {
			                        rule: 'isRequired',
			                        errorMessage: 'Please enter Card Name'
			                      }
			                    ]}
			                  	placeholder="Enter Card Name" />
			                </fieldset>
			                </div>
			              </div>
			              <div className="form-group">
			                <label htmlFor="number" className="col-sm-3 control-label">Card Number <i className="semi">:</i></label>
			                <div className="col-sm-8">
				                <fieldset disabled=""  >
				                  <Validation.Input
				                  	type="text"
				                  	className="form-control"
				                  	id="cardNumber"
				                  	name="cardNumber"
				                  	ref="cardNumber"
				                  	validations={[
				                      {
				                        rule: 'isRequired',
				                        errorMessage: 'Please enter card number'
				                      },
				                      {
				                        rule: 'isCardNumber',
				                        errorMessage: 'Enter a valid card number'
				                      }
				                    ]}
				                  	placeholder="Enter Card Number" />
				                </fieldset>
			                </div>
			              </div>
			              <div className="form-group">
			                <label htmlFor="cvv" className="col-sm-3 control-label">CVV <i className="semi">:</i></label>
			                <div className="col-sm-2">
			                <fieldset disabled=""  >
			                  <Validation.Input
				                type="text"
				                className="form-control"
				                id="cvv"
				                name="cvv"
				                ref="cvv"
				                validations={[
			                      {
			                        rule: 'isRequired',
			                        errorMessage: 'Please enter your cvv'
			                      },
			                      {
			                        rule: 'isCardNumber',
			                        errorMessage: 'Enter a valid cvv'
			                      }
			                    ]}
				                placeholder="CVV" />
				             </fieldset>
			                </div>
			              </div>
			              <div className="form-group">
			                <label htmlFor="valid" className="col-sm-3 control-label">Valid Thru <i className="semi">:</i></label>
			                <div className="col-sm-3">
			                	<fieldset disabled=""  >
				                  <Validation.Select
				                    id="expMonth"
				                    className="form-control"
				                    ref="expMonth"
				                    name="expMonth"
				                    validations={[
				                      {
				                        rule: 'isRequired',
				                        errorMessage: 'Please Select valid month'
				                      }
				                    ]}>
				                    {months}
				                  </Validation.Select>
				                 </fieldset>
			                </div>
			                <div className="col-sm-3">
				                <fieldset disabled="" >
				                   <Validation.Select
				                    className="form-control"
				                   	id = "expYear"
				                   	name = "expYear"
				                   	ref = "expYear"
				                   	validations={[
				                      {
				                        rule: 'isRequired',
				                        errorMessage: 'Please select Exp-Year'
				                      }
				                    ]}
				                   	placeholder="YY">
				                    {years}
				                  </Validation.Select>
				                </fieldset>
			                </div>
			              </div>
			              <div className="row">
				              <div className="col-sm-12">
				              	<Validation.Button className="btn primary-btn" id="paymentButton" value="Make Payment" />
				              </div>
				          </div>
			            </Validation.Form>
			            <br />
			          </article>
			        </section>
			)
			}

		}
	}
	render() {
		return this.renderPaymentForm()
	}
}

// To set theme for material-ui components
PaymentForm.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
