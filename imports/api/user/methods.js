import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const createNewUser = new ValidatedMethod({
	name: 'user.createNewUser',
	validate:  new SimpleSchema({
		email     : { type: String },
		password  : { type: String },	
		profile   : {type : Object},
		'profile.firstName'  : { type: String },
		'profile.lastName'   : { type: String, optional: true },
		'profile.name'       : { type: String },
		'profile.email'      : { type: String },
		'profile.role'       : { type: String },
		'profile.status'     : { type: String },
		'profile.homestayId' : { type: String, optional: true },
		'profile.gender'     : { type: String, optional: true },
		'profile.dateOfBirth': { type: Date, optional: true },
		'profile.country'    : { type: String, optional: true },
		'profile.mobile' 	 : { type: Number, optional: true }
    }).validator(),
	run(options){
		if (!Roles.userIsInRole(this.userId, ['Admin', 'Agency'])) {
			throw new Meteor.Error('not enough rights', 'Only admin can create new users!');
		}
		var newUserId = Accounts.createUser(options);
		// Possibly send out an enrollment email...
		// Accounts.sendEnrollmentEmail(newUserId);

		return newUserId;
	}
})

export const updateUser = new ValidatedMethod({
	name: 'user.updateUser',
	validate:  null,
	run(user){
		console.log(user)
		if (!Roles.userIsInRole(this.userId, ['Admin'])) {
			throw new Meteor.Error('not enough rights', 'Only admin can update user status!');
		}
		if(user.userId){
          	users = Meteor.users.update({_id:user.userId},{$set:user.options})
        } else {
        	throw new Meteor.Error('no data', 'User Id is missing');
        }
        return users
	}
})
export const findUser = new ValidatedMethod({
	name: 'user.findUser',
	validate: null,
	run(options){
		return Meteor.users.find({"emails.address":options.email}).fetch()[0];
	}
})

export const editProfile = new ValidatedMethod({
	name: 'user.editProfile',
	validate:  null,
	run(user){
		console.log(user)
		if(this.userId) {
          	users = Meteor.users.update({_id:this.userId},{$set:user})
        } else {
        	throw new Meteor.Error('no data', 'Please login to complete this action');
        }
        return users
	}
})

export const editAccountSetting = new ValidatedMethod({
	name: 'user.editAccountSetting',
	validate:  null,
	run(user){
		console.log(user)
		if(this.userId) {
          	users = Meteor.users.update({_id:this.userId},{$set:user})
        } else {
        	throw new Meteor.Error('no data', 'Please login to complete this action');
        }
        return users
	}
})



// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
	createNewUser,
    updateUser,
    findUser,
    editProfile,
    editAccountSetting
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