/*
    var secret = Meteor.settings.private.stripe.testSecretKey;
    var Stripe = StripeAPI(secret);
*/
    let STRIPE = {};
    // var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
    //     Stripe.setPublishableKey( stripeKey );

    let getToken = function( card, callback ) {
                Stripe.card.createToken( card, function( status, response ) {
                    console.log('to callback');
                       callback(response);
                });
            };

    STRIPE.getToken = getToken;

    export default STRIPE;