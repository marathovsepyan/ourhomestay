import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import moment from 'moment';

//API

//import { insertNotification } from '../notifications/methods.js';

class HomestaysCollection extends Mongo.Collection {
    insert(homestay, callback) {
        if (!homestay.createdAt) {
            homestay.createdAt = new Date();
        }
        if (!homestay.ownerId) {
            homestay.ownerId = Meteor.user()._id;
        }
        return super.insert(homestay, callback);
    }
}

export const Homestays = new HomestaysCollection('homestay');



Homestays.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

/*export const HomestayIndex = new EasySearch.Index({
  collection: Homestays,
  name:'homestay',
  fields: ['country'],
  engine: new EasySearch.MongoDB({
    selector: function (searchObject, options, aggregation) {
      console.log(searchObject)
      // selector contains the default mongo selector that Easy Search would use
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      // modify the selector to only match status = 1
      selector.status = 1;

      return selector;
    }
  }),
  defaultSearchOptions: {
    limit: 6
  },
  noDocumentsOnEmpty:true
});*/

Homestays.allow({
    insert: function (userId, doc) {
      // allow insert only for logged in user
      return userId;
    },
    update: function (userId, doc, fieldNames, modifier) {

      // allow update only created user or super-admin
      if (doc.ownerId == userId || Roles.userIsInRole(userId, 'Admin'))
         return true;
      else
        return false
    },
    remove: function (userId, doc) {
      console.log("userId", userId)
      // allow remove only created user or super-admin
      if (doc.ownerId == userId || Roles.userIsInRole(userId, 'Admin'))
         return true;
      else
        return false
    }
  });


Homestays.schema = new SimpleSchema({
   type             : { type: String },
   name             : { type: String },
   first_name       : { type: String },
   last_name        : { type: String },
   country          : { type: String },
   city             : { type: String },
   email            : { type: String },
   phone            : { type: Number },
   home             : { type: Number, optional: true },
   roomsNumber      : { type: Number },
   peopleLiving     : { type: Number },
   smoker           : { type: String },
   pets             : { type: String },
   postalCode   	  : { type: String, optional: true},
   address          : { type: String, optional: true },
   aboutHomestay    : { type: String},
   aboutPets        : { type: String},
   hobbies          : { type: String},
   tenant_gender    : { type: String, optional: true },
   tenant_smoker    : { type: String, optional: true },
   tenant_age       : { type: Number , optional: true },
   ownerId          : { type: String, regEx: SimpleSchema.RegEx.Id},
   userId           : { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
   userName         : { type: String, optional: true },
   created_at       : { type: Date },
   status           : { type: String },
   image            : {type: [Object], optional: true },
   "image.$._id"    : { type: String },
   "image.$.url"    : { type: String },
   videoUrl         : { type: String, optional: true },
   avg_rating       : { type: Number, decimal : true , optional: true },
   dailyPrice       : { type: Number , decimal : true, optional: true },
   weeklyPrice      : { type: Number , decimal : true, optional: true },
   services         : { type: [String], optional: true },
   foodRestrictions : { type: [String], optional: true },
   petTypes         : { type: [String], optional: true },
   mealsOptions     : { type: [String], optional: true }
})

Homestays.attachSchema(Homestays.schema);


//HOOKS
Homestays.after.insert((userId, doc) => {

});


// This represents the keys from Projects objects that should be published
// to the client. If we add secret properties to Message objects, don't list
// them here to keep them private to the server.
Homestays.publicFields = {
    // project: 1,
    // userTo: 1,
    // authorId: 1,
    // createdAt: 1
};

Homestays.helpers({
    isOwner(userId) {
        return this.ownerId === userId;
    }
});
