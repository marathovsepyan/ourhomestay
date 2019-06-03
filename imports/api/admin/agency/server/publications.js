import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


// publish agency data
Meteor.publish('agencyList', function(query, limit, skip) {
    if (skip) {
        skip = (skip-1)*5;
    } else {
        skip = 0
    }

    Counts.publish(this, 'agency-count', Meteor.users.find(query));
    var options = {
        sort:{'createdAt':-1},
        limit,
        skip
    }

    var agency = Meteor.users.find(query,options)

    return agency
})
