import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';


import { Homestays } from './homestays.js';
import { saveMailData } from './../../api/email/method.js';


export const listHomestay = new ValidatedMethod({
    name: 'homestay.listHomestay',
    validate:  new SimpleSchema({
    	homestayId : { type: String, regEx: SimpleSchema.RegEx.Id },
        userId  : { type: String, regEx: SimpleSchema.RegEx.Id },
        userName: { type: String }
    }).validator(),
    run(options) {
        if (Roles.userIsInRole(this.userId, ['Admin'])) {
			if(options.homestayId){
				if (options.userId) {
					var post = {
						userId : options.userId,
						ownerId : options.userId,
						userName : options.userName
					}
		            homestay = Homestays.update({_id:options.homestayId},{$set:post})
		            user    = Meteor.users.update({_id:options.userId},{$set:{"profile.homestayId":options.homestayId}})
		            var data = {homestay: homestay, user:user}
		            return data
		        } else {
		        	throw new Meteor.Error('no data', 'Select a user.');
		        }
	        } else {
	        	throw new Meteor.Error('no data', 'Homestay Id is missing');
	        }
		} else {
			throw new Meteor.Error('You are not authorized to assign user to homestay');
		}
    }
});

// email to homestay owner
export const sendHomestayBooking = new ValidatedMethod({
    name: 'homestay.sendMail',
    validate:  null,
    run (data) {
        if (! Meteor.userId()) {
            throw new Meteor.Error("Please Login to continue");
        } else if (Roles.userIsInRole(this.userId, ['Admin','Homestay','University residence','Accounting'])) {
            var homestay = Homestays.findOne({_id:data.homestayId})
            if(homestay){
            	var owner = Meteor.users.findOne(homestay.userId)
            	let email_options ={}

                email_options['subject'] = 'Homestay Booking'
                email_options['message'] = 'Got Booking for homestay: '+homestay.name
                email_options['recipient'] = homestay.email
                email_options['mail_template'] = "notification"
                params  = {
                    recipient_name : homestay.name, 
                    link : "http://52.42.62.56:3000/"
                };
                email_options['params'] = params;

                Meteor.call('sendMail',email_options)
            }
        } else {
            throw new Meteor.Error("You are not authorized to do this action");
        }
    }
});

// email to homestay owner
export const sendHomestayBookingCronJob = new ValidatedMethod({
    name: 'homestay.sendHomestayBookingCronJob',
    validate:  null,
    run (data) {
        var homestay = Homestays.findOne({_id:data.homestayId})
        console.log("next bookig started for : " + homestay.name+" "+homestay.email)
        if(homestay){
            var owner = Meteor.users.findOne(homestay.userId)
            let email_options ={}
            // email_options['subject'] = 'Homestay Booking'
            // email_options['email'] = homestay.email
            // email_options['message'] =  'Got Booking for homestay: '+homestay.name
            // Meteor.call('sendOrderMail',email_options)
            email_options['subject'] = 'Homestay Booking'
            email_options['message'] = 'Got Booking for homestay: '+homestay.name

            email_options['recipient'] = homestay.email
            email_options['params'] = {
                recipient_name : homestay.name
            }
            email_options['mail_template'] = "notification"
            console.log("homestay")
            console.log(email_options)
            saveMailData.call(email_options, (error, response) => {
                if (error)
                    console.log(error)
            })
                      
        }     
    }
});
// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
	listHomestay
], 'name');

if (Meteor.isServer) {
    // Only allow 5 list operations per connection per second
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(LISTS_METHODS, name);
        },

        // Rate limit per connection ID
        connectionId() { return true; },
    }, 5, 1000);
}