import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Payments } from '../payments.js';
import { Bookings } from '../../../api/booking/bookings.js';

// Publish all bokking details by userId
Meteor.publish('all-payments', function(limit, skip, filter){
    if (skip) {
        skip = (skip-1)*limit;
	} else {
		skip = 0
	}
    Counts.publish(this, 'transaction-count', Payments.find({}));
    var options = {
        sort:{'createdAt':-1},
        limit,
        skip
    }
    var booking_ids=[];
    var transaction_list = Payments.find({},options)
    _.each(transaction_list.fetch(), function(data) {
        if(data){
            booking_ids.push(data.orderId)
            booking_ids = _.uniq(booking_ids);
        } else{
            console.log("no data found")
        }
    });
    console.log(booking_ids)
    return [transaction_list,Bookings.find({_id: {$in: booking_ids}})]
  })