import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Comments } from '../comments.js';

// publish comments data
Meteor.publish('comments', function(homestayId,limit, skip) {
	if (skip) {
        skip = (skip-1)*5;
	} else {
		skip = 0
	}
    if (limit) {
        limit = limit*5;
    } else {
        limit = 5
    }
    Counts.publish(this, 'comments-count', Comments.find({'homestay_id':homestayId}));

    var options = {
        sort:{'created_at':-1},
        limit,
        skip
    }
    var comments_list = Comments.find({'homestay_id':homestayId},options)
    return comments_list
})
