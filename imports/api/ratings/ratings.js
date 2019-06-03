import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import moment from 'moment';


class RatingsCollection extends Mongo.Collection {
    insert(rate, callback) {
        if (!rate.created_at) {
            rate.created_at = new Date();
        }
        if (!rate.user_id) {
            rate.user_id = Meteor.user()._id;
        }
        return super.insert(rate, callback);
    }
}

export const Ratings = new RatingsCollection('ratings');

Ratings.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Ratings.allow({
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


Ratings.schema = new SimpleSchema({
   rate         : { type: Number , decimal : true },
   homestay_id  : { type: String,regEx: SimpleSchema.RegEx.Id },
   user_id      : { type: String, regEx: SimpleSchema.RegEx.Id},
   created_at   : { type: Date, optional: true }
})

Ratings.attachSchema(Ratings.schema);
