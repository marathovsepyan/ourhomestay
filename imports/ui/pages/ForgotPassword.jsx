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
      error : "",
      success : ""
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
		event.preventDefault();
		const email    = $(event.currentTarget).find('#userEmail').val().trim().toLowerCase();
		var self = this;
		this.setState({'error' : ''})
  		this.setState({'success' : ''})
		Accounts.forgotPassword({email: email}, function (e) {
			if (e) {
				console.log(e.reason);
				self.setState({'error':'Invalid email, '+e.reason});
			} else {
				console.log("Password reset requested succesfully!")
				self.setState({'success':'Password reset requested succesfully'});
			}
		}); 
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
    if(this.state.error) {
      return(
            <div className="error-message">{this.state.error} </div>
            )
    }
    if (this.state.success) {
      return (
          <div className="success-message">{this.state.success}</div>
      )
    }
  }

    getLoginForm () {
    	return (
    			<section className="main-content-wrapper login">
				<div className="container">
					<div className="user-accounts-wrapper">
						<div className="user-logo"><a href="/"><img src="../images/logo.png" alt /></a></div>
						<div className="header-wrap">Forgot Password</div>
						<Validation.Form id="form-login" className="user-form-wrap" role="form" onSubmit={this.handleSubmit.bind(this)}>
							<div className="form-group">
								{this.getMessage()}
							</div>
							<div className="form-group">
								<label htmlFor="userEmail" className="control-label">User Email</label>
								<Validation.Input
                        			className='form-control'
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
									placeholder="Enter Email"
                        			name='userEmail'
                        			ref='email'
                        			id='userEmail'
                        			type='text'/>
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
								<Validation.Button type="submit" className="btn primary-btn lg btn-block" value="RESET MY PASSWORD" />
								<a className="option-for-user user-register" href="/login">Back to login</a>
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