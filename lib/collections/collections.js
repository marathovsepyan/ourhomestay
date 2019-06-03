// if (Meteor.isClient) {  
//   // Client side Collection
//   // for manage plans and user saved card details
//   Cards = new Mongo.Collection('cards');
//   Plans = new Mongo.Collection('plans');
// }

// var imageStore = new FS.Store.GridFS(“images”);

// Images = new FS.Collection(“images”, {
//  stores: [imageStore]
// });
if (Meteor.isClient) {  
  // Client side Collection
  // for manage plans and user saved card details
  Cards = new Mongo.Collection('cards');

}