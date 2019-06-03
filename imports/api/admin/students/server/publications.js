import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


// publish student data
Meteor.publish('studentList', function(query,limit, skip) {
     if (skip) {
        skip = (skip-1)*5;
    } else {
        skip = 0
    }

    Counts.publish(this, 'student-count', Meteor.users.find(query));

    var options = {
        sort:{'createdAt':-1},
        limit,
        skip
    }

    var studentsList = Meteor.users.find(query,options)

    return studentsList
})