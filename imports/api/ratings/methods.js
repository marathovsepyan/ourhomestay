import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Homestays } from './../../api/homestays/homestays.js';
import { Ratings } from './ratings.js';


export const updateRate = new ValidatedMethod({
	name: 'rate.updateRate',
	validate:  null,
    run (rate) {
		if (! Meteor.userId()) {
			throw new Meteor.Error("Please Login to continue");
		} else if (rate.user_id == this.userId) {
			Ratings.update({_id:rate._id},{$set:{rate:rate.newRate}})
			homestayRate(rate.homestay_id)
			return
		} else {
			throw new Meteor.Error("You are not authorized to do this action");
		}
	}
});

export const createRate = new ValidatedMethod({
	name: 'rate.createRate',
	validate:  Ratings.schema.validator((err) => {console.log(err)}),
	run(rateDetails) {
		if (! Meteor.userId()) {
			throw new Meteor.Error("Please Login to continue");
		} else {
			var rate = Ratings.insert(rateDetails)
			homestayRate(rateDetails.homestay_id)
			return rate
		}
	}
})

const homestayRate = function(homestayId) {
	var ratings = Ratings.find({homestay_id:homestayId})
	if(ratings.count() > 0){
		var rate_total = _.reduce(ratings.fetch(), function(memo, data){ return memo + data.rate; }, 0)
	    var avg_rate = (rate_total)/ratings.count()
	    // update home stay with avg rate
	    Homestays.update({_id:homestayId},{$set:{avg_rating:avg_rate}})
	}
}