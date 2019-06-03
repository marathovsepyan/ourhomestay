import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import moment from 'moment';



//API

//import { insertNotification } from '../notifications/methods.js';

class EmailCollection extends Mongo.Collection {
    insert(emails, callback) {
        if (!emails.created_At) {
            emails.created_At = new Date();
        }
        return super.insert(emails, callback);
    }
}

export const Emails = new EmailCollection('emails');



Emails.deny({
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


Emails.schema = new SimpleSchema({
    recipient              : { type : String},
    subject                 : { type : String},
    message                 : { type : String},
    params                  : { type : Object, optional :true},
    created_At              : { type : Date },
    attempts                : { type : Number, optional: true},
    max_attempts            : { type : Number, optional: true},
    mail_template           : { type : String},
    "params.recipient_name" : { type : String},
    "params.link"           : { type : String}
})

Emails.attachSchema(Emails.schema);


//HOOKS
Emails.after.insert((userId, doc) => {

});


// This represents the keys from Projects objects that should be published
// to the client. If we add secret properties to Message objects, don't list
// them here to keep them private to the server.
Emails.publicFields = {
    // project: 1,
    // userTo: 1,
    // authorId: 1,
    // createdAt: 1
};