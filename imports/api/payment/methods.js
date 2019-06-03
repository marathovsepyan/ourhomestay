import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Payments } from './payments.js';

export const updatePayment = new ValidatedMethod({
	name: 'payment.updatePayment',
	validate:  null,
    run (payment) {
		if(payment.paymentId){
            paymentData = Payments.update({_id:payment.paymentId},{$set:payment.options})
        } else {
        	throw new Meteor.Error('no data', 'Payment Id is missing');
        }
       return paymentData
	}
});
export const newPayment = new ValidatedMethod({
    name: 'payment.newPayment',
    validate:   new SimpleSchema({
        orderId         : { type: String, regEx: SimpleSchema.RegEx.Id},
        roomId          : { type: String, regEx: SimpleSchema.RegEx.Id},
        roomType        : { type: String }, // homestay, universityResidence
        userId          : { type: String, regEx: SimpleSchema.RegEx.Id},
        userRole        : { type: String },
        paymentStatus   : { type: Number }, //succes: 1, failed :0
        paymentAmount   : { type: Number , decimal : true},
        customerId      : { type: String }
    }).validator(),
    run(payment_data) {
        let payment = Payments.insert(payment_data);
        return payment
    }
});
// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
	updatePayment,
    newPayment
], 'name');

if (Meteor.isServer) {
    // Only allow 5 list operations per connection per second
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(LISTS_METHODS, name);
        },

        // Rate limit per connection ID
        connectionId() { return true; },
    }, 5, 1000);
}