import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';


import { Homestays } from '../../homestays/homestays.js';



export const assignHomestayUser = new ValidatedMethod({
    name: 'homestay.assignUser',
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

export const updateHomestay = new ValidatedMethod({
	name: 'homestay.updateHomestay',
	validate:  null,
    run (homestay) {
		if (Roles.userIsInRole(this.userId, ['Admin', 'Homestay', 'University residence'])) {
			if(homestay.homestayId){
				let post = "";
				if(homestay.options.images && homestay.options.videoUrl) {
					post = {$set:{videoUrl : homestay.options.videoUrl}, $push:{image : homestay.options.images}}
				} else if (homestay.options.images) {
					post = {$push:{image : homestay.options.images[0]}}
				} else{
					post = {$set:homestay.options}
				}
	            homestay = Homestays.update({_id:homestay.homestayId},post)
	        } else {
	        	throw new Meteor.Error('no data', 'Homestay Id is missing');
	        }
           return homestay
		} else {
			throw new Meteor.Error('You are not authorized to edit this details');
		}
	}
});
export const deleteImage = new ValidatedMethod({
	name: 'homestay.deleteImage',
	validate:  new SimpleSchema({
		homestayId 		 : { type: String, regEx: SimpleSchema.RegEx.Id },
		imageId     	 : { type: String }
    }).validator(),
    run (options) {
		if (Roles.userIsInRole(this.userId, ['Admin','Homestay','University residence'])) {
			if(options.homestayId){
	            homestay = Homestays.update({_id:options.homestayId},{$pull:{image : { _id: options.imageId } }})
	        } else {
	        	throw new Meteor.Error('no data', 'Homestay Id is missing');
	        }
           return homestay
		} else {
			throw new Meteor.Error('You are not authorized to edit this details');
		}
	}
});
export const createHomestay = new ValidatedMethod({
	name: 'homestay.createHomestay',
	validate:  Homestays.schema.validator((err) => {console.log(err)}),
	run(homestayDetails) {
		if (! Meteor.userId()) {
			throw new Meteor.Error("Please Login to continue");
		} else if (!Roles.userIsInRole(Meteor.userId(), ['Admin', 'Homestay', 'University residence'])) {
			throw new Meteor.Error("not-authorized");
		} else {
			var homestay = Homestays.insert(homestayDetails)
			if (Roles.userIsInRole(Meteor.userId(), ['Homestay', 'University residence'])) {
				users = Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.homestayId' : homestay}})
			}
			return homestay
		}
	}
});
export const deleteHomestay = new ValidatedMethod({
	name: 'homestay.deleteHomestay',
	validate:  null,
	run(homestayId) {
		if (! Meteor.userId()) {
			throw new Meteor.Error("Please Login to continu");
		} else if (!Roles.userIsInRole(Meteor.userId(), ['Admin', 'Homestay', 'University residence'])) {
			throw new Meteor.Error("not-authorized");
		} else {
			var homestay = Homestays.remove({_id: homestayId})
			if (Roles.userIsInRole(Meteor.userId(), ['Homestay', 'University residence'])) {
				users = Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.homestayId' : ''}})
			}
			return homestay
		}
	}
});

// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
    assignHomestayUser,
    updateHomestay,
	createHomestay,
	deleteHomestay,
    deleteImage
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