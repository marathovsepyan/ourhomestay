import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';


import { Bookings } from './bookings.js';
import { Homestays } from './../../api/homestays/homestays.js';
import { Payments } from './../../api/payment/payments.js';
import { sendHomestayBooking } from './../../api/homestays/methods.js';


export const createBooking = new ValidatedMethod({
    name: 'bookings.createBooking',
    validate:   new SimpleSchema({
    	roomId 		    : { type: String, regEx: SimpleSchema.RegEx.Id, optional :true },
        roomType        : { type: String, optional :true },
        bookingType     : { type: String, optional :true },
        bookingStatus   : { type: Number},
        dailyPrice 	    : { type: Number , decimal : true, optional :true },
        weeklyPrice 	: { type: Number , decimal : true, optional :true },
        checkinDate     : { type: Date, optional :true },
	    checkoutDate    : { type: Date, optional :true },
	    lengthOfStay    : { type: Number, optional :true},
        paymentAmount   : { type: Number , decimal : true, optional :true },
        studentId       : { type: String, regEx: SimpleSchema.RegEx.Id, optional :true },
        ownerId         : { type: String, regEx: SimpleSchema.RegEx.Id },
        ownerRole       : { type: String },
        searchIndex     : { type: String, optional :true}
    }).validator(),
    run(options) {
        let bookingData = {
            roomId          : options.roomId,
            roomType        : options.roomType, 
            ownerId         : options.ownerId,
            ownerRole       : options.ownerRole,
            paymentAmount   : options.paymentAmount,
            checkinDate     : options.checkinDate,
            checkoutDate    : options.checkoutDate,
            bookingType     : options.bookingType,
            lengthOfStay    : options.lengthOfStay,
            paymentStatus   : -1, // payment not made
            choice1         : options.roomId,
            creationDate    : new Date(),
            choice1Status   : false,
            bookingStatus   : -1,
            searchIndex     : options.searchIndex
        }
        console.log(Roles.userIsInRole(Meteor.userId(), ['Student']))
        if(Roles.userIsInRole(Meteor.userId(), ['Student'])) {
            bookingData['studentId'] = Meteor.userId()
        }
        let booking = Bookings.insert(bookingData);
        return booking
    }
});


export const updateStatus = new ValidatedMethod({
    name: 'bookings.updateStatus',
    validate:  null,
    run (data) {
        console.log("inside update status call ")
        console.log(data)
        if (! Meteor.userId()) {
            throw new Meteor.Error("Please Login to continue");
        } else if (Roles.userIsInRole(this.userId, ['Admin','Homestay','University residence','Accounting'])) {
            var booking_data = Bookings.findOne(data._id)
            var homestay_data ="";
            var paymentAmount = "";
            if(booking_data.multipleChoice){
                if(booking_data.currentChoice == 1){
                    if(data.status == 1){
                        homestay_data = Homestays.findOne(booking_data.roomId);
                        return ({bookingStatus : Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}}), homestayData : homestay_data})
                    } else if(data.status == 2) {
                       homestay_data = Homestays.findOne(booking_data.choice2);
                       if (booking_data.bookingType == "dayBooking") {
                            paymentAmount = booking_data.lengthOfStay * homestay_data.dailyPrice;
                       } else {
                            paymentAmount = booking_data.lengthOfStay * homestay_data.weeklyPrice;
                       }
                       Payments.update({orderId:booking_data._id},{$set:{roomId:booking_data.choice2,paymentAmount:paymentAmount}})
                       return ({bookingStatus : Bookings.update({_id:data._id},{$set:{roomId:booking_data.choice2,currentChoice:2,paymentAmount:paymentAmount}}), homestayData : homestay_data}) 
                    }
                } else if(booking_data.currentChoice == 2){
                    if(data.status == 1){
                        homestay_data = Homestays.findOne(booking_data.roomId);
                        return ({bookingStatus : Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}}), homestayData : homestay_data}) 
                    } else if(data.status == 2) {
                        homestay_data = Homestays.findOne(booking_data.choice3);
                        if (booking_data.bookingType == "dayBooking") {
                            paymentAmount = booking_data.lengthOfStay * homestay_data.dailyPrice;
                        } else {
                            paymentAmount = booking_data.lengthOfStay * homestay_data.weeklyPrice;
                        }
                        Payments.update({orderId:booking_data._id},{$set:{roomId:booking_data.choice3,paymentAmount:paymentAmount}})

                        return ({bookingStatus : Bookings.update({_id:data._id},{$set:{roomId:booking_data.choice3,currentChoice:3,paymentAmount:paymentAmount}}) , homestayData : homestay_data}) 
                    }
                } else if(booking_data.currentChoice == 3){
                    if(data.status == 1){
                        homestay_data = Homestays.findOne(booking_data.roomId);
                        return ({bookingStatus : Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}}) , homestayData : homestay_data}) 
                    } else if(data.status == 2) {
                       homestay_data = Homestays.findOne(booking_data.roomId);
                       return ({bookingStatus : Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}}) , homestayData : homestay_data})  
                    }
                }

            } else {
                homestay_data = Homestays.findOne(booking_data.roomId);
                return ({bookingStatus : Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}}), homestayData : homestay_data}) 
            }
        } else {
            throw new Meteor.Error("You are not authorized to do this action");
        }
    }
});

export const updateBookingStatusCronJob = new ValidatedMethod({
    name: 'bookings.updateBookingStatusCronJob',
    validate:  null,
    run (data) {
        console.log("inside update status call ")
        console.log(data)
            var booking_data = Bookings.findOne(data._id);
            var homestay_data ="";
            var paymentAmount = "";
            if(booking_data.multipleChoice){
                if(booking_data.currentChoice == 1){
                    if(data.status == 1){
                        return Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}})
                    } else if(data.status == 2) {
                       // return Bookings.update({_id:data._id},{$set:{roomId:booking_data.choice2,currentChoice:2}}) 
                       homestay_data = Homestays.findOne(booking_data.choice2);
                       if (booking_data.bookingType == "dayBooking") {
                            paymentAmount = booking_data.lengthOfStay * homestay_data.dailyPrice;
                       } else {
                            paymentAmount = booking_data.lengthOfStay * homestay_data.weeklyPrice;
                       }
                       Payments.update({orderId:booking_data._id},{$set:{roomId:booking_data.choice2,paymentAmount:paymentAmount}})
                       return Bookings.update({_id:data._id},{$set:{roomId:booking_data.choice2,currentChoice:2,paymentAmount:paymentAmount, processStartTime:data.processStartTime}}) 
                    }
                } else if(booking_data.currentChoice == 2){
                    if(data.status == 1){
                        return Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}})
                    } else if(data.status == 2) {
                        // return Bookings.update({_id:data._id},{$set:{roomId:booking_data.choice3,currentChoice:3}}) 
                        homestay_data = Homestays.findOne(booking_data.choice3);
                        if (booking_data.bookingType == "dayBooking") {
                            paymentAmount = booking_data.lengthOfStay * homestay_data.dailyPrice;
                        } else {
                            paymentAmount = booking_data.lengthOfStay * homestay_data.weeklyPrice;
                        }
                        Payments.update({orderId:booking_data._id},{$set:{roomId:booking_data.choice3,paymentAmount:paymentAmount}})

                        return Bookings.update({_id:data._id},{$set:{roomId:booking_data.choice3,currentChoice:3,paymentAmount:paymentAmount,processStartTime:data.processStartTime}}) 
                    }
                } else if(booking_data.currentChoice == 3){
                    if(data.status == 1){
                        return Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}})
                    } else if(data.status == 2) {
                       return Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}}) 
                    }
                }

            } else {
                return Bookings.update({_id:data._id},{$set:{bookingStatus:data.status}})
            }
    }
});

export const updateBooking = new ValidatedMethod({
    name: 'bookings.updateBooking',
    validate : null,
    run(options) {
        console.log(options)
        if(options.bookingId){
                booking = Bookings.update({_id:options.bookingId},{$set:options.bookingDetail})
        } else {
            throw new Meteor.Error('no data', 'Booking Id is missing');
        }
       return booking
    }
})
// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
	createBooking,
    updateBooking,
    updateBookingStatusCronJob
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