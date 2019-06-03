import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Homestays } from '../homestays.js';

// publish homestay data in admin listing
Meteor.publish('homestays', function(query, limit, skip) {
	if (skip) {
        skip = (skip-1)*limit;
	} else {
		skip = 0
	}
    Counts.publish(this, 'homestay-count', Homestays.find(query));

    var options = {
        sort:{'created_at':-1},
        limit,
        skip
    }
    var homestay_list = Homestays.find(query,options)
    return homestay_list
})

// publish university data in admin listing
Meteor.publish('universities', function(query, limit, skip) {
    if (skip) {
        skip = (skip-1)*limit;
    } else {
        skip = 0
    }
    Counts.publish(this, 'university-count', Homestays.find(query));

    var options = {
        sort:{'created_at':-1},
        limit,
        skip
    }
    var university_list = Homestays.find(query,options)
    return university_list
})

// publish homestay data by id 
Meteor.publish('homestayById', function(homestayId){
  var homestayData = Homestays.find({_id:homestayId})
  return homestayData
})

// Publish users homestay detail by id
Meteor.publish('homestayDetail', function(homestayId){
  var homestayData = Homestays.find({_id:homestayId})
  return homestayData
})

// publish homestay List
Meteor.publish('homestayList', function(limit, skip) {
    limit = limit *6;
    Counts.publish(this, 'homestayList-count', Homestays.find({'status':'active'}));

    var options = {
        sort:{'created_at':-1},
        limit,
        skip
    }
    var homestay_list = Homestays.find({'status':'active'})
    return homestay_list
})

// publish homestay List
Meteor.publish('homestaySearch', function(query, limit, skip) {
    console.log("homestay search")
    console.log(query)
    console.log(typeof query._id )
    // limit = limit *6;
    Counts.publish(this, 'homestaySearch-count', Homestays.find(query));

    var options = {
        sort  : {'created_at':-1},
        limit : Number(limit),
        skip  : Number(skip)
    }
    var homestay_list = Homestays.find(query,options)
    console.log(Homestays.find(query,options).fetch())
    return homestay_list
})