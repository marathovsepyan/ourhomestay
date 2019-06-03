import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';


import { Comments } from './comments.js';


export const deleteComment = new ValidatedMethod({
	name: 'comment.deleteComment',
	validate:  null,
    run (comment) {
		if (! Meteor.userId()) {
			throw new Meteor.Error("Please Login to continue");
		} else if (Roles.userIsInRole(this.userId, ['Admin']) || comment.isOwner || comment.user_id == this.userId) {
			return Comments.remove(comment._id)
		} else {
			throw new Meteor.Error("You are not authorized to do this action");
		}
	}
});

export const createComment = new ValidatedMethod({
	name: 'comment.createComment',
	validate:  Comments.schema.validator((err) => {console.log(err)}),
	run(commentDetails) {
		if (! Meteor.userId()) {
			throw new Meteor.Error("Please Login to continue");
		} else {
			var comment = Comments.insert(commentDetails)
			return comment
		}
	}
})

// // Get list of all method names on Lists
// const LISTS_METHODS = _.pluck([
//     assignHomestayUser,
//     updateHomestay,
//     createHomestay,
//     deleteImage
// ], 'name');

// if (Meteor.isServer) {
//     // Only allow 5 list operations per connection per second
//     DDPRateLimiter.addRule({
//         name(name) {
//             return _.contains(LISTS_METHODS, name);
//         },

//         // Rate limit per connection ID
//         connectionId() { return true; },
//     }, 5, 1000);
// }