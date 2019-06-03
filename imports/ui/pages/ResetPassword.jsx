import React, {Component} from 'react';

import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

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
    }
});


export default class Login extends Component{
	constructor(props) {
		super(props);

		this.state = {
			message : ""     
		};
	}
	componentDidMount () {
		if(Meteor.userId()){
			if(Roles.subscription.ready()) {
	            if (Roles.userIsInRole(Meteor.userId(), 'Admin')) {
	                FlowRouter.go('/admin/homestays')
	            } else if(Roles.userIsInRole(Meteor.userId(), 'Homestay')) {
	                FlowRouter.go('/homestay')
	            } else if(Roles.userIsInRole(Meteor.userId(), 'University residence')) {
	                FlowRouter.go('/universityresidence')
	            } else if (Roles.userIsInRole(Meteor.userId(), 'Accounting')) {
                    FlowRouter.go('/account/orders')
                } else {
	                if (Meteor.user().profile.status == 'active') {       
	                    if (Roles.userIsInRole(Meteor.userId(), 'Student')) {
	                        FlowRouter.go('/')
	                    } else if (Roles.userIsInRole(Meteor.userId(), 'Agency')) {
				            // FlowRouter.go('/agency')
				            FlowRouter.go('/')
				        } 
	                } else {
	                    Meteor.logout()
	                    Session.set('log-error', 'Account is not enabled');
	                }
	            } 
	        }
        }
	}
	handleSubmit(event){
		var self = this;
		event.preventDefault();
		self.setState({'message':''});
		password = $(event.currentTarget).find('#Password').val();
		confirmPassword = $(event.currentTarget).find('#confirmPassword').val();
		if(confirmPassword != password){
			self.setState({'message':'Your password and confirmation password do not match'});
			// confirmPassword.focus();return false;
			return false;
		}else{
			if(FlowRouter.current().params._resetPasswordToken){
				 Accounts.resetPassword(FlowRouter.current().params._resetPasswordToken, password, function (err, response) {
					console.log("err, response");
					console.log(err);
					console.log(response);
					if (err) {
						console.log(err);
						self.setState({'message':'We are sorry but something went wrong!'});
					} else {
						console.log('Your password has been changed. Welcome back!');
						FlowRouter.go('/')
					}
            	});
			}else{
				self.setState({'message':'We are sorry but something went wrong!'});
			}
		}
	}

	customCheckbox (event){
        event.preventDefault();
        $(event.currentTarget).find('label').toggleClass('active'); 
        if($(event.currentTarget).find('label').hasClass('active')){
            $(event.currentTarget).find('input').prop('checked', true);
        }else{
            $(event.currentTarget).find('input').prop('checked', false);
        }
    }

    getMessage() {
		if(this.state.message) {
			return (
				<div className="error-message">
					{this.state.message}	
				</div>
			)
		}  
    } 

    getLoginForm () {
    	return (
    			<section className="main-content-wrapper login">
				<div className="container">
					<div className="user-accounts-wrapper">
						<div className="user-logo"><a href="/"><img src="../images/logo.png" alt /></a></div>
						<div className="header-wrap">Reset Password</div>
						<Validation.Form id="form-login" className="user-form-wrap" role="form" onSubmit={this.handleSubmit.bind(this)}>
							<div className="form-group">
								{this.getMessage()}
							</div>
							<div className="form-group">
								<label htmlFor="Password" className="control-label">Password</label>
								<Validation.Input 
									type="password" 
									name="password" 
									ref="password" 
									className="form-control" 
									id="Password" 
									placeholder="Enter password" 
									validations={[
										{
											rule: 'isRequired', 
											errorMessage: 'Please enter your password'
										}
									]} />
							</div> 
							<div className="form-group">
								<label htmlFor="confirmPassword" className="control-label">Confirm Password</label>
								<Validation.Input 
									type="password" 
									name="confirmPassword" 
									ref="confirmPassword"
									className="form-control" 
									id="confirmPassword" 
									placeholder="Retype your password" 
									validations={[
										{
											rule: 'isRequired', 
											errorMessage: 'Please retype your password'
										}
									]} />
							</div> 
							{/*  <div class="form-group middle-block">
							<div class="custom-checkbox" onClick={this.customCheckbox.bind(this)}>
							<label>
							<input id="newsUpdates" type="checkbox"> Remember me 
							</label>
							</div>
							<a class="forgot-password" href="#">Forgot my password?</a>
							</div> */}
							<div className="form-group text-center">
								<Validation.Button type="submit" className="btn primary-btn lg btn-block" value="Reset My Password" />
							</div>
						</Validation.Form>
					</div>
				</div>
			</section>		
    	)
    }
	render () {
		return this.getLoginForm()
	}
};