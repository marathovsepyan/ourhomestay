import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Bookings } from '../bookings.js';
import { Homestays } from '../../../api/homestays/homestays.js';


// Publish users homestay detail by id
Meteor.publish('bookingDetail', function(bookingId){
  var bookingData = Bookings.find({_id:bookingId})
  return bookingData
})


Meteor.publish('bookingDetailForRatings', function(homestayId,userId){
console.log("homestayId:",homestayId)
console.log("userId:",userId)
  var bookingData = Bookings.find( { roomId: homestayId, $or: [ { ownerId: userId} ,{ studentId: userId} ] } )
    console.log(bookingData.count())
  return bookingData
})

// Publish all bokking details by userId
Meteor.publish('all-bookings', function(limit, skip, filter){
    var query ={bookingStatus:{ $ne: -1 }}
    if (Roles.userIsInRole(this.userId, ['Student'])){
    	query['studentId'] = this.userId
    } else if (Roles.userIsInRole(this.userId, ['Agency'])){
    	query['ownerId'] = this.userId
    } else if (Roles.userIsInRole(this.userId, ['Homestay','University residence'])){
    	var user = Meteor.users.findOne({_id:this.userId})
    	if(user && user.profile.homestayId)
    		query['roomId'] = user.profile.homestayId
    	else
    		query['roomId'] = this.userId
    } 
    
    if (filter){
    	query = _.extend(query, filter);
    } 

    if (skip) {
        skip = (skip-1)*limit;
	} else {
		skip = 0
	}
    Counts.publish(this, 'booking-count', Bookings.find(query));
    var options = {
        sort:{'creationDate':-1},
        limit,
        skip
    }
    var booking_list = Bookings.find(query,options)

    // publish homestay details and user details
    let users_ids = [],
    	homestays_ids = [];
    _.each(booking_list.fetch(), function(data) {
        if(data){
            if(data.multipleChoice){
                if (data.choice2) {
                    homestays_ids.push(data.choice2);
                } 
                if (data.choice3) {
                    homestays_ids.push(data.choice3);
                }
            }
        	if (data.roomId) {
    		    homestays_ids.push(data.roomId);
    		}
    		if (data.ownerId) {
    		    users_ids.push(data.ownerId);
    		}
    		if ( data.studentId) {
    		    users_ids.push(data.studentId);
    		}
            homestays_ids = _.uniq(homestays_ids);
            users_ids = _.uniq(users_ids);
        } else{
            console.log("no data found")
        }
    });

    return [booking_list,Homestays.find({_id: {$in: homestays_ids}},{fields:{name:1,userId:1}}),Meteor.users.find({_id: {$in: users_ids}},{fields:{'profile.name':1,'emails':1}})]
})
