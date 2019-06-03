import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import moment from 'moment';


class SettingsCollection extends Mongo.Collection {
    insert(setting, callback) {
        if (!setting.created_at) {
            setting.created_at = new Date();
        }
        return super.insert(setting, callback);
    }
}

export const Settings = new SettingsCollection('settings');

Settings.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Settings.allow({
    insert: function (userId, doc) {
      // allow insert only for logged in user
      return userId;
    },
    update: function (userId, doc, fieldNames, modifier) {

      // allow update only  super-admin
      if (Roles.userIsInRole(userId, 'Admin'))
         return true;
      else
        return false
    },
    remove: function (userId, doc) {
      // allow remove only super-admin
      if (Roles.userIsInRole(userId, 'Admin'))
         return true;
      else
        return false
    }
  });


Settings.schema = new SimpleSchema({
   commission_amount         : { type: Number , decimal : true },
   commission_amount_week    : { type: Number , decimal : true },
   homestay_processing_time  : { type: Number },
   booking_cancellation      : { type: Number },    
   created_at   : { type: Date, optional: true }
})

Settings.attachSchema(Settings.schema);
