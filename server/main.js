import '/imports/startup/server';
import { Settings } from '/imports/api/admin/settings/settings.js';
import { Bookings } from '/imports/api/booking/bookings.js';
import { Homestays } from '/imports/api/homestays/homestays.js';
import { updateBookingStatusCronJob } from '/imports/api/booking/methods.js';
import { sendHomestayBookingCronJob } from '/imports/api/homestays/methods.js';
import { saveMailData } from '/imports/api/email/method.js';
import { updateBooking } from '/imports/api/booking/methods.js';
import { updatePayment } from '/imports/api/payment/methods.js';
import '/imports/api/email/methods.js';
import { Payments } from '/imports/api/payment/payments.js';

// add roles
Meteor.users.after.insert(function (userId, doc) {
  // add role to user
  Roles.addUsersToRoles(doc._id, doc.profile.role)
});


// CRAETE ADMIN USER
Meteor.startup(function () {
  var admin = Meteor.users.findOne({ emails: { $elemMatch: { address: 'admin@admin.com' } } });
  var denise = Meteor.users.findOne({ emails: { $elemMatch: { address: 'denise@admin.com' } } });
  var aly = Meteor.users.findOne({ emails: { $elemMatch: { address: 'aly@admin.com' } } })
  if (!admin) {
    Accounts.createUser({
      email: 'admin@admin.com',
      password: 'admin',
      profile: {
        firstName: 'admin',
        lastName: 'admin',
        name: 'admin' + ' ' + 'admin',
        mobile: 9447598547,
        role: 'Admin',
        country: 'India'
      }
    })
  }
  if (!denise) {
    Accounts.createUser({
      email: 'denise@admin.com',
      password: 'denise',
      profile: {
        firstName: 'Denise',
        lastName: 'Schroeder',
        name: 'Denise' + ' ' + 'Schroeder',
        mobile: 9447598547,
        role: 'Admin',
        country: 'India'
      }
    })
  }
  if (!aly) {
    Accounts.createUser({
      email: 'aly@admin.com',
      password: 'aly',
      profile: {
        firstName: 'Aly',
        lastName: 'Aly',
        name: 'aly' + ' ' + 'aly',
        mobile: 9447598547,
        role: 'Admin',
        country: 'India'
      }
    })
  }
  fs = Npm.require('fs');
});



// Config for fileupload
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    imageVersions: { thumbnailBig: { width: 1600, height: 683 } },
    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
    checkCreateDirectories: true, //create the directories for you
    getFileName: function (file, formData) {
      var homestayId = formData._id
      var fileExtension = file.name.substr((file.name.lastIndexOf('.') + 1));
      // image.push({url:fileInfo.baseUrl+fileInfo.name,_id:new Meteor.Collection.ObjectID()._str})
      return new Date().getTime() + '-' + Math.floor((Math.random() * 10000) + 1) + '.' + fileExtension;
    },
    finished: function (file, folder, formFields) { }
    // finished(fileInfo, formFields) {
    //     var image = []
    //     console.log(formFields)
    //     console.log(typeof formFields)
    //     var homestayId = formFields._id
    //     console.log(homestayId)
    //     image.push({url:fileInfo.baseUrl+fileInfo.name,_id:new Meteor.Collection.ObjectID()._str})
    //     Meteor.call('addHomestayImage',homestayId,image)
    //  }
  });
});
var MyLogger = function (opts) {
  console.log('Level', opts.level);
  console.log('Message', opts.message);
  console.log('Tag', opts.tag);
}
SyncedCron.config({
  logger: MyLogger
});
// cron for Move expired campaigns as inactive
SyncedCron.add({
  name: 'Process homestay request',
  schedule: function (parser) {
    // parser is a later.parse object
    // every day at 12:05 am
    return parser.text('every 1 hour');
  },
  job: function () {
    let processingTime = Settings.find().fetch()[0].homestay_processing_time;
    let bookingTime = new Date();
    console.log("current Date : " + new Date())
    let data = {};
    bookingTime.setHours(bookingTime.getHours() - processingTime);
    console.log("bookingTime : " + bookingTime)
    console.log("bookings")
    console.log(Bookings.find({ "processStartTime": { $lte: bookingTime }, customerId: { $exists: true }, bookingStatus: 0 }).fetch())

    let bookings = Bookings.find({ "processStartTime": { $lte: bookingTime }, customerId: { $exists: true }, bookingStatus: 0 }).fetch();

    if (bookings.length > 0) {
      bookings.map(function (booking, index) {

        console.log(bookingTime.getHours())
        booking.processStartTime.setHours(booking.processStartTime.getHours() + processingTime);
        console.log("booking.processStartTime")
        console.log(booking.processStartTime)
        console.log(booking.processStartTime.getTime())
        if (booking.processStartTime.getTime() <= new Date().getTime()) {
          let homestay = Homestays.find({ "_id": booking.roomId }).fetch()[0]
          console.log("current homestay : " + homestay.name)
          let today = new Date();
          data['status'] = 2
          data['_id'] = booking._id
          data['processStartTime'] = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), 0, 0);

          updateBookingStatusCronJob.call(data, (error, response) => {
            if (error) {
              console.log("error")
              console.log(error)
            } else {
              console.log("response")
              console.log(response)

              booking = Bookings.find({ _id: booking._id }).fetch()[0];
              let email_options = {}
              let params = {}
              if (booking.bookingStatus != 2) {

                email_options['subject'] = booking.roomType + ' Booking'
                email_options['message'] = 'Rejected ' + booking.roomType + ' ' + homestay.name

                email_options['recipient'] = Meteor.users.findOne({ "_id": booking.ownerId }).emails[0].address;
                params = {
                  recipient_name: Meteor.users.findOne({ "_id": booking.ownerId }).profile.name
                };
                email_options['params'] = params;
                email_options['mail_template'] = "notification";
                console.log("reject1 email_options agency")
                console.log(email_options)
                saveMailData.call(email_options, (error, response) => {
                  if (error)
                    console.log(error)
                })
              } else if (booking.bookingStatus == 2) {
                console.log("booking failed")

                email_options['subject'] = booking.roomType + ' Booking'
                email_options['message'] = 'Rejected ' + booking.roomType + ' ' + homestay.name + '. Please change your search criteria and make a new request.'

                email_options['recipient'] = Meteor.users.findOne({ "_id": booking.ownerId }).emails[0].address;
                params = {
                  recipient_name: Meteor.users.findOne({ "_id": booking.ownerId }).profile.name
                };

                email_options['params'] = params;
                email_options['mail_template'] = "notification"
                console.log("reject email_options agency")
                console.log(email_options)
                saveMailData.call(email_options, (error, response) => {
                  if (error)
                    console.log(error)
                })
              }

              // check homestay alternative choice then send mail
              if (booking.multipleChoice) {
                console.log("mulipleChoice client")
                console.log("current choice : " + booking.currentChoice)
                if (booking.currentChoice == 2) {
                  let homestay_choice = {
                    homestayId: booking.choice2
                  }
                  sendHomestayBookingCronJob.call(homestay_choice, (error, response) => {
                    if (error)
                      console.log(error)
                  })

                } else if (booking.currentChoice == 3 && booking.bookingStatus == 0) {
                  let homestay_choice = {
                    homestayId: booking.choice3
                  }
                  sendHomestayBookingCronJob.call(homestay_choice, (error, response) => { })
                }
              }
            }
          });
        }
      })
    }
  }
});

// cron for send mail notification in dayAfter14Days and dayAfter11Days
SyncedCron.add({
  name: 'Notify user booking details ',
  schedule: function (parser) {
    // parser is a later.parse object
    // every day at 12:05 am
    return parser.text('every day at 12:05 am');
  },
  job: function () {
    let currentDate = new Date();
    console.log("current Date : " + currentDate);
    let now = new Date();
    let dayAfter14Days = new Date(now.setDate(now.getDate() + 15));
    dayAfter14Days = new Date(dayAfter14Days.getFullYear(), dayAfter14Days.getMonth(), dayAfter14Days.getDate(), 0, 0, 0, 0)
    now = new Date();
    let dayAfter11Days = new Date(now.setDate(now.getDate() + 12));
    dayAfter11Days = new Date(dayAfter11Days.getFullYear(), dayAfter11Days.getMonth(), dayAfter11Days.getDate(), 0, 0, 0, 0)

    let bookingsDayAfter14Days = Bookings.find({ "checkinDate": { $lte: dayAfter14Days }, customerId: { $exists: true }, bookingStatus: 1, paymentStatus: 0 }).fetch();
    console.log("DayAfter14Days length --------------" + bookingsDayAfter14Days.length)
    console.log("dayAfter14Days        --------------" + dayAfter14Days)
    if (bookingsDayAfter14Days.length > 0) {
      bookingsDayAfter14Days.map(function (booking, index) {
        console.log("----------" + booking.checkinDate.getDate())
        console.log("------------" + booking.checkinDate)
        let email_options = {};
        let params = {};
        let homestay = Homestays.find({ "_id": booking.roomId }).fetch()[0];
        let userId = booking.ownerId;
        let user = Meteor.users.findOne({ "_id": userId });
        // console.log("booking.checkinDate : "+booking.checkinDate)
        // console.log("dayAfter14Days : "+dayAfter14Days)
        // console.log("homestay")
        // console.log(homestay)
        // console.log("current homestay : " + homestay.name)
        //get b4 14 day checkinDate
        if (parseInt(booking.checkinDate.getDate())+1 === dayAfter14Days.getDate()) {
          console.log("inside if in dayAfter14Days")
          // console.log("notification before 14 days")
          email_options['subject'] = booking.roomType + ' Booking'
          email_options['message'] = 'Your payment for ' + booking.roomType + ' ' + homestay.name + ' will be processed next week.'
          email_options['recipient'] = Meteor.users.findOne({ "_id": booking.ownerId }).emails[0].address;
          params = {
            recipient_name: Meteor.users.findOne({ "_id": booking.ownerId }).profile.name
          };
          email_options['params'] = params;
          email_options['mail_template'] = "notification"

          // console.log("b4 14days notification email_options")
          // console.log(email_options)

          saveMailData.call(email_options, (error, response) => { })
        }
      })
    }

    let bookingsDayAfter11Days = Bookings.find({ "checkinDate": { $lte: dayAfter11Days }, customerId: { $exists: true }, bookingStatus: 1, paymentStatus: 0 }).fetch();
    console.log("dayAfter11Days length --------------" + bookingsDayAfter11Days.length)
    console.log("dayAfter11Days        --------------" + dayAfter11Days)
    if (bookingsDayAfter11Days.length > 0) {
      bookingsDayAfter11Days.map(function (booking, index) {
        console.log("----------" + booking.checkinDate.getDate())
        console.log("------------" + booking.checkinDate)
        let email_options = {};
        let params = {};
        let homestay = Homestays.find({ "_id": booking.roomId }).fetch()[0];
        let userId = booking.ownerId;
        let user = Meteor.users.findOne({ "_id": userId });
        //get b4 11 day checkinDate
        if (parseInt(booking.checkinDate.getDate())+1 == dayAfter11Days.getDate()) {
          console.log("notification before 11 days")
          email_options['subject'] = booking.roomType + ' Booking'
          email_options['message'] = 'Your payment for ' + booking.roomType + ' ' + homestay.name + ' will be processed next week.'
          email_options['recipient'] = Meteor.users.findOne({ "_id": booking.ownerId }).emails[0].address;
          params = {
            recipient_name: Meteor.users.findOne({ "_id": booking.ownerId }).profile.name
          };
          email_options['params'] = params;
          email_options['mail_template'] = "notification"

          // Meteor.call('sendOrderMail',email_options)
          saveMailData.call(email_options, (error, response) => { })
        }
      })
    }
  }
})



// cron for Payment
SyncedCron.add({
  name: 'Booking payment',
  schedule: function (parser) {
    // parser is a later.parse object
    // every day at 12:05 am
      return parser.text('every 3 hours');
  },
    job: function () {
      let currentDate = new Date();
      console.log("current Date : " + currentDate);
    let now = new Date();
    let dayAfter7Days = new Date(now.setDate(now.getDate() + 8));
    dayAfter7Days = new Date(dayAfter7Days.getFullYear(), dayAfter7Days.getMonth(), dayAfter7Days.getDate(), 0, 0, 0, 0)
      
    let bookingsDayAfter7Days = Bookings.find({ "checkinDate": { $lte: dayAfter7Days }, customerId: { $exists: true }, bookingStatus: 1, paymentStatus: 0 }).fetch();
    console.log("dayAfter7Days length--------------" + bookingsDayAfter7Days.length)
    if (bookingsDayAfter7Days.length > 0) {
      bookingsDayAfter7Days.map(function (booking, index) {
        console.log("----------" + booking.checkinDate.getDate())
        console.log("------------" + booking.checkinDate)
        let email_options = {};
        let params = {};
        let homestay = Homestays.find({ "_id": booking.roomId }).fetch()[0];
        let userId = booking.ownerId;
        let user = Meteor.users.findOne({ "_id": userId });
        //get b4 7 day checkinDate
        if (booking.checkinDate.getDate()+1 == dayAfter7Days.getDate()) {
          console.log("-----Enter 7 Days function --------")
          let self = this;
          // call meteor method for direct stripe payment
          // input: user stripeid,amount,paymane data (for payment collection)
          console.log("-----orderId: ", booking._id,
            " roomId:", booking.roomId,
            "roomType:", booking.roomType,
            "  userId:", booking.ownerId, "-----")
          let paymentData = {
            orderId: booking._id,
            roomId: booking.roomId,
            roomType: booking.roomType,
            userId: booking.ownerId,
            userRole: user.roles[0],
            paymentAmount: booking.paymentAmount,
            paymentStatus: -1
          }
          Meteor.call('stripeDirectPayment', user.stripe.customerId, paymentData.paymentAmount, paymentData, booking.roomId, function (error, res) {
            if (error) {
              console.log("---stripeDirectPayment -----error---");
              console.log(error)
            } else {
              console.log("---stripeDirectPayment -----res---");
              console.log(res)
              if (res.error) {
                console.log("---stripeDirectPayment -----res.error---");
                console.log(res.error)
                let paymentArg = "";
                paymentArg = { paymentStatus: -1 };

                //update paymentStatus -1
                updateBooking.call({ bookingId: paymentData.orderId, bookingDetail: paymentArg }, (error, data) => {
                  if (error) {
                    console.log(error)
                  } else {
                    console.log(data)
                  }
                })
              } else {
                console.log("---------------");
                let paymentArg = "";
                let bookingArg = "";

                paymentArg = { paymentStatus: 1 };
                bookingArg = { paymentStatus: true };


                // if (res.paid) {
                //   paymentArg = { paymentStatus: 1 };
                //   bookingArg = { paymentStatus: true };
                // } else {
                //   paymentArg = { paymentStatus: 0 };
                //   bookingArg = { paymentStatus: false };
                // }
                //update paymentStatus

                updateBooking.call({ bookingId: paymentData.orderId, bookingDetail: paymentArg }, (error, response) => {
                  if (error) {
                    console.log("----error updated payment----");

                  } else {

                    let paymentId = Payments.findOne({ "orderId": paymentData.orderId })._id;
                    updatePayment.call({ paymentId: paymentId, options: paymentArg }, (error, data) => {
                      if (error) {
                        console.log("---------Update PaymentStatus error-------");
                        console.log(error)
                      } else {
                        console.log("---------Updated PaymentStatus -------");
                        console.log(data)
                        var options = {}

                        options['subject'] = 'OurHomeStay - Payment Successfull'
                        options['message'] = 'Payment Successfull. Thank You for booking through OurHomeStay.'
                        options['email'] = user.emails[0].address
                        // Method for send email
                        Meteor.call("sendMail", options, function (error) {
                          if (error) {
                            //console.log(error)
                          }
                        })
                        options['subject'] = 'OurHomeStay - Booking Successfull'
                        options['message'] = 'Booking Successfull. Your booking for ' + homestay.name + ' is successfull. Your checkin date is ' + moment(booking.checkinDate).format("MMM Do YY");
                        options['email'] = user.emails[0].address
                        // Method for send email
                        Meteor.call("sendMail", options, function (error) {
                          if (error) {
                            //console.log(error)
                          }
                        })
                        console.log("message----------===========", paymentData.roomId);
                        let OwnerEmail = Meteor.users.findOne({ "profile.homestayId": paymentData.roomId }).emails[0].address;
                        console.log("message----------===========", OwnerEmail);
                        options['subject'] = 'OurHomeStay - User Payment'
                        options['message'] = 'Payment Successful. ' + user.profile.name + ' has made Payment.'
                        options['email'] = OwnerEmail
                        // Method for send email
                        Meteor.call("sendMail", options, function (error) {
                          if (error) {
                            //console.log(error)
                          }
                        })
                        //console.log("Payment Successfull")
                      }
                    });
                  }
                })
              }
            }
          })
        }
      })
    }
  }
})


// cron for Payment
SyncedCron.add({
  name: 'Cancellation booking',
  schedule: function (parser) {
    // parser is a later.parse object
    // every day at 12:05 am
      return parser.text('every day at 12:05 am');
  },
  job: function () {
    let cancellationDays = Settings.find().fetch()[0].booking_cancellation+1;
    let now = new Date();
    let dayAfterCancelDay = new Date(now.setDate(now.getDate() + cancellationDays)); // for Cancellation 
    dayAfterCancelDay = new Date(dayAfterCancelDay.getFullYear(), dayAfterCancelDay.getMonth(), dayAfterCancelDay.getDate(), 0, 0, 0, 0)
    console.log("dayAfterCancelDay", dayAfterCancelDay)

    let bookingsDayAfterCancelDay = Bookings.find({ "checkinDate": { $lte: dayAfterCancelDay }, customerId: { $exists: true }, bookingStatus: 1, paymentStatus: 0 }).fetch();
    console.log("dayAfterCancelDay length--------------" + bookingsDayAfterCancelDay.length)
    if (bookingsDayAfterCancelDay.length > 0) {
      bookingsDayAfterCancelDay.map(function (booking, index) {
        console.log("----------" + booking.checkinDate.getDate())
        console.log("----------" + booking.checkinDate)
        let email_options = {};
        let params = {};
        let homestay = Homestays.find({ "_id": booking.roomId }).fetch()[0];
        let userId = booking.ownerId;
        let user = Meteor.users.findOne({ "_id": userId });
        if (bookingsDayAfterCancelDay.length > 0) {
          //get b4 3 day checkinDate
            console.log("-----Enter 3 Days function --------")
            let paymentArg = "";
                paymentArg = { bookingStatus: -1 };
                updateBooking.call({ bookingId: booking._id, bookingDetail: paymentArg }, (error, data) => {
              if (error) {
                console.log(error)
              } else {
                console.log(data)
              }
            })
          }

      })
    }
  }
})


SyncedCron.add({
  name: 'send email function',
  schedule: function (parser) {
    // parser is a later.parse object
    // every day at 12:05 am
    return parser.text('every 5 minutes');
  },
  job: function () {
    console.log("--send email function--")
    Meteor.call('process.sendemail');
  }
});



SyncedCron.start();
console.log(new Date())
// create an account object in users collection (only Homestay and University residence )
Accounts.onCreateUser(function (options, user) {

  // Use provided profile in options, or create an empty object
  user.profile = options.profile || {};


  // Returns the user object
  return user;
});
