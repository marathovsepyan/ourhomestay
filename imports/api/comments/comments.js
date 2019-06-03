import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import moment from 'moment';

//API

//import { insertNotification } from '../notifications/methods.js';

class CommentsCollection extends Mongo.Collection {
    insert(comment, callback) {
        if (!comment.created_at) {
            comment.created_at = new Date();
        }
        if (!comment.user_id) {
            comment.user_id = Meteor.user()._id;
        }
        if (!comment.name) {
            comment.name = Meteor.user().profile.name;
        }
        return super.insert(comment, callback);
    }
}

export const Comments = new CommentsCollection('comments');

Comments.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Comments.allow({
    insert: function (userId, doc) {
      // allow insert only for logged in user
      return userId;
    },
    update: function (userId, doc, fieldNames, modifier) {

      // allow update only created user or super-admin
      if (doc.userId == userId || Roles.userIsInRole(userId, 'Admin'))
         return true;
      else
        return false
    },
    remove: function (userId, doc) {
      // allow remove only created user or super-admin
      if (doc.userId == userId || Roles.userIsInRole(userId, 'Admin'))
         return true;
      else
        return false
    }
  });


Comments.schema = new SimpleSchema({
   name         : { type: String },
   message      : { type: String },
   homestay_id     : { type: String,regEx: SimpleSchema.RegEx.Id },
   user_id      : { type: String, regEx: SimpleSchema.RegEx.Id},
   created_at   : { type: Date, optional: true }
})

Comments.attachSchema(Comments.schema);


//HOOKS
Comments.after.insert((userId, doc) => {

});

Comments.helpers({
});