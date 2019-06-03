import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// publish university_reidence users list
Meteor.publish('universityList', function(limit, skip) {
    if (skip) {
        skip = (skip-1)*5;
    } else {
        skip = 0
    }

    var options = {
        sort:{'createdAt':-1},
        limit,
        skip
    }

    Counts.publish(this, 'university-count', Meteor.users.find({"roles":"University residence"}));
    
    var universityList = Meteor.users.find({"roles":"University residence"},{fields:{profile:1, roles:1, emails:1}, sort:{'createdAt':-1} , limit:limit, skip:skip})

    return universityList
})