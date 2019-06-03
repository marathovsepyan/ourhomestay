import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Ratings } from '../ratings.js';

// publish user rate data
Meteor.publish('user.rating', function(homestayId) {
    var rate = Ratings.find({'homestay_id':homestayId,'user_id':this.userId})
    return rate
})
