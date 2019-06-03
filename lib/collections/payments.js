// Payments = new Mongo.Collection('payments');



// Payments.helpers({
//   // attach owner details with campaign
//   userData() {
//     return Meteor.users.findOne(this.user);
//   }
// });


// if (Meteor.isServer) {
//   Payments.allow({
//     insert: function (userId, doc) {
//       return false;
//     },

//     update: function (userId, doc, fieldNames, modifier) {
//       return false;
//     },

//     remove: function (userId, doc) {
//       return false;
//     }
//   });

//   Payments.deny({
//     insert: function (userId, doc) {
//       return true;
//     },

//     update: function (userId, doc, fieldNames, modifier) {
//       return true;
//     },

//     remove: function (userId, doc) {
//       return true;
//     }
//   });
// }
