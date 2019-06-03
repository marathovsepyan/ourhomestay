import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// publish all user data
Meteor.publish('userList', function (limit) {
  Counts.publish(this, 'users-count', Meteor.users.find({}));

    var usersList = Meteor.users.find({},{sort:{'createdAt':-1} , limit:limit})

    return usersList;
});

Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    roles: 1
  }});
});

Meteor.publish('userDetail', function() {
  return  Meteor.users.find(this.userId, {fields: {
    stripe: 1,planName:1,planAmount:1,account:1
  }});
});

Meteor.publish('users', function(userId) {
  if(!userId) return null;
  return Meteor.users.find(userId);
});
