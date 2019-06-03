// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// import moment from 'moment';

// //API

// //import { insertNotification } from '../notifications/methods.js';

// class HomestaysCollection extends Mongo.Collection {
//     insert(homestay, callback) {
//         if (!homestay.createdAt) {
//             homestay.createdAt = new Date();
//         }
//         if (!homestay.ownerId) {
//             homestay.ownerId = Meteor.user()._id;
//         }
//         return super.insert(homestay, callback);
//     }
// }

// export const Homestays = new HomestaysCollection('homestay');

// Homestays.allow({
//     insert: function (userId, doc) {
//       // allow insert only for logged in user
//       return userId;
//     },
//     update: function (userId, doc, fieldNames, modifier) {

//       // allow update only created user or super-admin
//       if (doc.ownerId == userId || Roles.userIsInRole(userId, 'Admin'))
//          return true;
//       else
//         return false
//     },
//     remove: function (userId, doc) {
//       // allow remove only created user or super-admin
//       if (doc.ownerId == userId || Roles.userIsInRole(userId, 'Admin'))
//          return true;
//       else
//         return false
//     }
//   });


// Homestays.schema = new SimpleSchema({
//    name         : { type: String },
//    location     : { type: String },
//    email        : { type: String },
//    phone        : { type: Number},
//    roomsNumber  : { type: Number},
//    peopleLiving : { type: Number},
//    smoker       : { type: String },
//    pets         : { type: String },
//    address      : { type: String, optional: true},
//    tenant_gender: { type: String, optional: true},
//    tenant_smoker: { type: String, optional: true},
//    ownerId      : { type: String, regEx: SimpleSchema.RegEx.Id},
//    userId       : { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
//    userName     : { type: String, optional: true },
//    created_at   : { type: Date },
//    status       : { type: String },
//    image        : { type: [String], optional: true },
//    videoUrl     : { type: String, optional: true },
//    dailyPrice   : { type: Number, optional: true },
//    weeklyPrice  : { type: Number, optional: true },
//    services     : { type: [String], optional: true }
// })

// Homestays.attachSchema(Homestays.schema);


// //HOOKS
// Homestays.after.insert((userId, doc) => {

// });


// // This represents the keys from Projects objects that should be published
// // to the client. If we add secret properties to Message objects, don't list
// // them here to keep them private to the server.
// Homestays.publicFields = {
//     // project: 1,
//     // userTo: 1,
//     // authorId: 1,
//     // createdAt: 1
// };

// Homestays.helpers({
//     isOwner(userId) {
//         return this.ownerId === userId;
//     }
// });