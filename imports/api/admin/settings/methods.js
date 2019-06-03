import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Settings } from './settings.js';


export const updateSettings = new ValidatedMethod({
	name: 'settings.update',
	validate:  null,
    run (settings) {
		if (! Meteor.userId()) {
			throw new Meteor.Error("Please Login to continue");
		} else if (Roles.userIsInRole(this.userId, ['Admin'])){
			return Settings.update({_id:settings._id},{$set:settings})
		} else {
			throw new Meteor.Error("You are not authorized to do this action");
		}
	}
});

export const createSettings = new ValidatedMethod({
	name: 'settings.create',
	validate:  Settings.schema.validator((err) => {console.log(err)}),
	run(settings) {
		console.log('11111111')
		if (! Meteor.userId()) {
			throw new Meteor.Error("Please Login to continue");
		} else if (Roles.userIsInRole(this.userId, ['Admin'])) {
			return Settings.insert(settings)
		} else {
			throw new Meteor.Error("You are not authorized to do this action");
		}
	}
})
