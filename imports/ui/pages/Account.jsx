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

// React Component for BookRoom form
export default class AccountForm extends Component {
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
	    $(event.currentTarget).find('#saveCard').prop('disabled',true)
	    var currentElement = $(event.currentTarget);
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
	    var card_exist = this.props.card;
 
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
            	currentElement.find('#saveCard').prop('disabled',false)
            } else {
                let token = card.id;
                let cardId = card.card.id
                // call function to create a new stripe customer
            	Meteor.call('stripeCreateCustomer', token, cardId, function (error, response) {
            		console.log(error)
            		console.log(response)
            		if(error) {
            			self.setState({'error': error.message})
            			currentElement.find('#saveCard').prop('disabled',false)
            		} else {
            			self.setState({"success": "Card details saved successfully"})
            			currentElement.find('#saveCard').prop('disabled',false)
            		}
            	})
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
				              	<Validation.Button className="btn primary-btn" id="saveCard" value="Save Card" />
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
				              	<Validation.Button className="btn primary-btn" id="saveCard" value="Save Card" />
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
		// return this.renderPaymentForm()
		return (
			<section className="dashboard-content-wrapper common-layout-box">
		        {this.renderPaymentForm()}
		    </section>
		)
	}
}

// To set theme for material-ui components
AccountForm.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
    const CardHandler = Meteor.subscribe('cards')
    const userHandler = Meteor.subscribe('userDetail')
    return {
        currentUser     : Meteor.user(),
        card            : Cards.findOne(),
        cardLoading     : !CardHandler.ready()
    }
}, AccountForm);
