SSR.compileTemplate('orderEmail', Assets.getText('order.html'));
SSR.compileTemplate('notificationEmail', Assets.getText('notification.html'));

var secret = Meteor.settings.private.stripe.testSecretKey;
var Stripe = StripeAPI(secret);
var Future = Npm.require('fibers/future');

import '/imports/startup/server';
import { Payments } from '/imports/api/payment/payments.js';

Meteor.methods({
	 // function to send email
	sendMail : function(options) {
    console.log(options)
    // console.log(email_template)
      var emailData = {
        link: options.params.link,
        recepient_name: options.params.recipient_name,
        content: options.message
      };

      Email.send({
        to: options.recipient,
        from: "OurHomestay <homestay.toobler@gmail.com>",
        subject: options.subject,
        html: SSR.render('notificationEmail', emailData)
      });
	},
   // function to send email
  sendOrderMail : function(options) {
    console.log(options)
    return Email.send({
      to: options.email,
      from: "homestay.toobler@gmail.com",
      subject: options.subject,
      html: SSR.render('orderEmail', options),
    });
  },

	saveFile: function(file) {
	    var name = 'test', encoding = 'binary';
	    // Clean up the path. Remove any initial and final '/' -we prefix them-,
	    // any sort of attempt to go to the parent directory '..' and any empty directories in
	    // between '/////' - which may happen after removing '..'
	    path = '../../public/images/'

	    // TODO Add file existance checks, etc...
	    fs.writeFile(path + name, file, encoding, function(err) {
	      if (err) {
	        throw (new Meteor.Error(500, 'Failed to save file.', err));
	      } else {
	        console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
	      }
	    });
  },
  // Method to create stripe customer
  stripeCreateCustomer: function (token,card) {
         console.log("stripeCreateCustomer")
        var stripeCustomer = new Future();

      Stripe.customers.create({
          source: token,
          email: Meteor.user().emails[0].address
      }, Meteor.bindEnvironment(function (error, customer) {
          if (error) {
              error.error = true;
              stripeCustomer.return(error);
          } else {
            console.log("customer")
            console.log(customer)
            // add customer id in user table
            Meteor.users.update({_id: Meteor.userId()},{$set:{"stripe.customerId":customer.id,"stripe.cardId":card,"stripe.token":token}});
              stripeCustomer.return(customer);
          }
      }));
      return stripeCustomer.wait();
  },
  // method for stripe direct payment
  // also insert new entry to payment table after successfull stripe payment
  stripeDirectPayment: function(stripeCustomerId,amount,payment_data,homestayUserId){
		console.log("--stripeDirectPayment--");
    var stripePayment = new Future();
    var homestayUser = Meteor.users.findOne({"profile.homestayId":homestayUserId});
    var acct_id = homestayUser.account.managedAccID;
		var _currency = homestayUser.account.currency;
    _amount = amount*100;
		// create charges
		Stripe.charges.create({
        amount: _amount,
        currency: _currency,
        customer: stripeCustomerId,
				destination: acct_id
			},Meteor.bindEnvironment( function (err, res) {
        if(err){
					console.log('--------err in charges------',res);
          err.error = true;
          stripePayment.return(err);
        }
        else {
					//transfer amount
					console.log('-----res----',res);
					Stripe.transfers.create({
					  amount: _amount,
					  currency: _currency,
					  recipient: "self"
					}, {
					  stripe_account: acct_id
					}, function(err, transfer) {
					  if(err){
							console.log("transfer err----:",err);
							err.error = true;
		          stripePayment.return(err);
						}
						else {
							console.log("transfer res----:",transfer);
							Stripe.accounts.retrieve(
								acct_id,
								function(err, account) {
									console.log("account details------",account);
								}
							);
							stripePayment.return(transfer);
						}
					});
        }
    }));
    return stripePayment.wait();
  },
  apiVerification: function(user){
    console.log("inside apiVerification----")
    Stripe.accounts.update(acct_id, {
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: "192.168.2.120"
        }
      }
    );
  },
  stripeManagedAccount: function(user,profileData){
    var stripePayment = new Future();
    var self = this;
    console.log(user)
    // Method to create stripe customer
      console.log("stripeCreateManagedAccount------------")
      console.log(user)
      if(!user.account){
        console.log("inside  Stripe.accounts.create---")

          Stripe.accounts.create({
          managed: true,
          email: user.emails[0].address,
          country: profileData['account.country'],
          external_account: {
            object: "bank_account",
						country: profileData['account.country'],
						currency: profileData['account.currency'],
						routing_number: profileData['account.routingNumber'],
						account_number: profileData['account.accNo']
          },
          legal_entity: {
						personal_id_number: profileData['account.ssn_last4'],
						first_name: profileData['account.firstName'],
						last_name: profileData['account.lastName'],
						type: "individual",
            dob: {
							day: new Date(profileData['account.dateOfBirth']).getUTCDate(),
							month: new Date(profileData['account.dateOfBirth']).getMonth()+1,
							year: new Date(profileData['account.dateOfBirth']).getFullYear()
            },
            address: {
							city: profileData['account.city'],
							state: profileData['account.state'],
							line1: profileData['account.address'],
							postal_code: profileData['account.postalCode']
            }
          },
          tos_acceptance: {
            date: Math.floor(Date.now() / 1000),
            ip: "192.168.2.120"
          }
        }, Meteor.bindEnvironment(function(err, account) {
          if(err){
            console.log("bindEnvironment",err)
            err.error = true;
            stripePayment.return(err);
          } else{
            console.log("account.id",account.id)
            updatedata= {
              'account.managedAccID':account.id
            }
            console.log("managedAccID ",account.id)
            users = Meteor.users.update({_id:self.userId},{$set:updatedata})
            stripePayment.return(users);
          }
        }));
      }
      else{
        console.log("inside  Stripe.accounts.update---")
        Stripe.accounts.update(
          user.account.managedAccID,
          {
            email: user.emails[0].address,
            external_account: {
              object: "bank_account",
              country: profileData['account.country'],
              currency: profileData['account.currency'],
              routing_number: profileData['account.routingNumber'],
              account_number: profileData['account.accNo']
            },
            legal_entity: {
              personal_id_number: profileData['account.ssn_last4'],
              first_name: profileData['account.firstName'],
              last_name: profileData['account.lastName'],
              dob: {
                day: new Date(profileData['account.dateOfBirth']).getUTCDate(),
                month: new Date(profileData['account.dateOfBirth']).getMonth()+1,
                year: new Date(profileData['account.dateOfBirth']).getFullYear()
              },
              address: {
                city: profileData['account.city'],
                state: profileData['account.state'],
                line1: profileData['account.address'],
                postal_code: profileData['account.postalCode']
              }
            }
				}, Meteor.bindEnvironment(function(err, account) {
          if(err){
            console.log("bindEnvironment",err)
            err.error = true;
            stripePayment.return(err);
          } else{
            console.log("account.id",account.id)
            console.log("managedAccID ",account.id)
            stripePayment.return(users);
          }
        }));
			}
    	return stripePayment.wait();
  }
});

Meteor.method("search-users", function (query) {
  var response = [],
      item = {}

  // find all users that match given query
  users = Meteor.users.find({ "emails.address": { $regex: query,$options: '-i' },"roles":"Homestay","profile.homestayId":"" })
  users.forEach(function(data){
    item['id']=data._id+'-'+data.profile.name
    item['text']=data.emails[0].address
    // set image or default image
    // if (data.profile.image)
    //   item['avatar_url']= data.profile.image
    // else
    //   item['avatar_url']= '/img/profiles/default.png'
    // // get email if exist
    if (data.emails)
      item['name']= data.profile.name
    response.push(item)
    item ={}

  })
  return response;
}, {
  url: "search-users",
  httpMethod: "get",
  getArgsFromRequest: function (request) {

    // Let's say we want this function to accept a url-encoded request with
    // fields named `q`
    var query = request.query;

    return [query.q];
  }
})

Meteor.method("search-university", function (query) {
  var response = [],
      item = {}

  // find all users that match given query
  users = Meteor.users.find({ "emails.address": { $regex: query,$options: '-i' },"roles":"University residence","profile.homestayId":"" })
  console.log(users)
  users.forEach(function(data){
    item['id']=data._id+'-'+data.profile.name
    item['text']=data.emails[0].address
    // set image or default image
    // if (data.profile.image)
    //   item['avatar_url']= data.profile.image
    // else
    //   item['avatar_url']= '/img/profiles/default.png'
    // // get email if exist
    if (data.emails)
      item['name']= data.profile.name
    response.push(item)
    item ={}

  })
  return response;
}, {
  url: "search-university",
  httpMethod: "get",
  getArgsFromRequest: function (request) {

    // Let's say we want this function to accept a url-encoded request with
    // fields named `q`
    var query = request.query;
    console.log(query.q)
    return [query.q];
  }
})
