import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const updateUser = new ValidatedMethod({
	name: 'agency.updateUser',
	validate:  null,
	run(user){
		console.log(user)
		if (!Roles.userIsInRole(this.userId, ['Admin'])) {
			throw new Meteor.Error('not enough rights', 'Only admin can create new users!');
		}
		if(user.userId){
          	users = Meteor.users.update({_id:user.userId},{$set:user.options})
        } else {
        	throw new Meteor.Error('no data', 'User Id is missing');
        }
        return users
	}
})

// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
    updateUser
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