/*
Meteor.publish('homestayList', function(limit, skip) {
  Counts.publish(this, 'homestay-count', Meteor.users.find({"roles":"Homestay"}));
  var homestays = Meteor.users.find({"roles":"Homestay"},{fields:{profile:1, roles:1, emails:1}, sort:{'createdAt':-1} , limit:limit, skip:skip})

  return homestays
})

Meteor.publish('homestayUsers', function() {
  Counts.publish(this, 'homestayUser-count', Meteor.users.find({"roles":"Homestay","profile.homestayId":""}));
  var homestayUser = Meteor.users.find({"roles":"Homestay","profile.homestayId":""},{fields:{emails:1 }, sort:{'createdAt':-1}})

  return homestayUser
  
})

Meteor.publish('homestayArray', function() {
  var homestays = Meteor.users.find({})

  return homestays
})*/


var secret = Meteor.settings.private.stripe.testSecretKey;
var Stripe = StripeAPI(secret);

Meteor.publish('cards', function() {

    var self = this;
    var user = Meteor.users.findOne({
        _id: this.userId
    });
    // Some very interesting books
    if(user && user.stripe){

      Stripe.customers.retrieveCard(
          user.stripe.customerId,
          user.stripe.cardId,
          function(err, card) {
            if(err){
              return self.ready();
            }
            else{
                self.added('cards', Random.id(),card);
                return self.ready();
            }
          }
        );
    } else {
      return self.ready();
    }

  });