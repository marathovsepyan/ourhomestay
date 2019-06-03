Meteor.startup(function() {
    var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    Stripe.setPublishableKey( stripeKey );
    //[...]

    STRIPE = {
        getToken: function( card, callback ) {
            Stripe.card.createToken( card, function( status, response ) {
                console.log('to callback');
                   callback(response);
            });
        }
    };
    
});