import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import moment from 'moment';

import { Homestays } from './../../api/homestays/homestays.js';


//API

//import { insertNotification } from '../notifications/methods.js';

class BookingCollection extends Mongo.Collection {
    insert(bookings, callback) {
        if (!bookings.creationDate) {
            bookings.creationDate = new Date();
        }
        return super.insert(bookings, callback);
    }
}

export const Bookings = new BookingCollection('bookings');



Bookings.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});


/*Bookings.allow({
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
      // allow remove only created user or super-admin
      if (doc.ownerId == userId || Roles.userIsInRole(userId, 'Admin'))
         return true;
      else
        return false
    }
  });*/


Bookings.schema = new SimpleSchema({
    roomId           : { type: String, regEx: SimpleSchema.RegEx.Id, optional :true},
    roomType         : { type: String, optional :true }, // homestay, universityResidence
    searchIndex      : { type: String, optional :true }, // search query
    ownerId          : { type: String, regEx: SimpleSchema.RegEx.Id},
    ownerRole        : { type: String },
    studentId        : { type: String, regEx: SimpleSchema.RegEx.Id, optional :true},
    paymentStatus    : { type: Number, optional :true}, //-1:payment not made, 0: payment not deducted, 1: success, 2: failed
    paymentAmount    : { type: Number , decimal : true, optional :true},
    checkinDate      : { type: Date , optional :true},
    checkoutDate     : { type: Date , optional :true},
    bookingType      : { type: String, optional :true}, // weekBooking /dayBooking
    bookingStatus    : { type: Number}, // -1:not active, 0: pending, 1: active, 2: rejected
    multipleChoice   : { type : Boolean, optional: true},
    lengthOfStay     : { type: Number, optional :true},
    choice1          : { type: String, regEx: SimpleSchema.RegEx.Id, optional :true},
    choice2          : { type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    choice3          : { type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    currentChoice    : { type : Number, optional: true},
    creationDate     : { type : Date },
    stripeId         : { type : String , optional: true},
    customerId       : { type : String , optional: true},
    name             : { type : String, optional :true},
    email            : { type : String, optional :true},
    gender           : { type : String, optional :true},
    country          : { type : String, optional :true},
    dateOfBirth      : { type : Date, optional: true },
    smoker           : { type : String, optional: true},
    pets             : { type : String, optional: true},
    purposeOfStay    : { type : String, optional :true},
    processStartTime : { type: Date , optional :true}// process initiating time for each homestay to accept/reject booking
})

Bookings.attachSchema(Bookings.schema);


//HOOKS
Bookings.after.insert((userId, doc) => {

});


// This represents the keys from Projects objects that should be published
// to the client. If we add secret properties to Message objects, don't list
// them here to keep them private to the server.
Bookings.publicFields = {
    // project: 1,
    // userTo: 1,
    // authorId: 1,
    // createdAt: 1
};

Bookings.helpers({
    homestay() {
        return Homestays.findOne(this.roomId)
    },
    student() {
        return Meteor.users.findOne(this.studentId)
    },
    agent() {
        if(this.ownerRole == 'Agency')
            return Meteor.users.findOne(this.ownerId)
        else
            return null
    }
});
