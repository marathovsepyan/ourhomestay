import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Settings } from '../settings.js';

// publish settings data
Meteor.publish('settings', function() {
    return Settings.find({})
})
