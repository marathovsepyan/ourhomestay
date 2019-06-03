import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import moment from 'moment';

import { Bookings } from './../../api/booking/bookings.js';
//API

//import { insertNotification } from '../notifications/methods.js';

class PaymentsCollection extends Mongo.Collection {
    insert(payment, callback) {
        if (!payment.createdAt) {
            payment.createdAt = new Date();
        }
        if (!payment.userId) {
            payment.userId = Meteor.user()._id;
        }
        return super.insert(payment, callback);
    }
}

export const Payments = new PaymentsCollection('payment');




Payments.helpers({
  // attach owner details with Payments
  userData() {
    return Meteor.users.findOne(this.user_id);
  }
});


Payments.allow({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});

Payments.deny({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },

  remove: function (userId, doc) {
    return true;
  }
});


Payments.schema = new SimpleSchema({
  orderId         : { type: String, regEx: SimpleSchema.RegEx.Id},
  roomId          : { type: String, regEx: SimpleSchema.RegEx.Id},
  roomType        : { type: String }, // homestay, universityResidence
  userId          : { type: String, regEx: SimpleSchema.RegEx.Id},
  userRole        : { type: String },
  paymentStatus   : { type: Number }, //succes: 1, failed :0, pending : -1
  paymentAmount   : { type: Number , decimal : true},
  paymentAt       : { type: Date, optional : true },
  createdAt        : { type: Date },
  customerId      : { type: String }
})

Payments.attachSchema(Payments.schema);

Payments.helpers({
    booking() {
        return Bookings.findOne(this.orderId)
    }
});

