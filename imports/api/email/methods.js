import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email'
import { Emails } from './email.js';

// SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));
SSR.compileTemplate('notificationEmail', Assets.getText('notification.html'));
// SSR.compileTemplate('forgotpasswordEmail', Assets.getText('reset-password.html'));		
SSR.compileTemplate('welcomeEmail', Assets.getText('welcome.html'));

Meteor.methods({
  'process.sendemail'() {
  		
  		// So this line will return something  // {'type':'forgotpassword'}
		const process_data = Emails.find({},{limit : 10});
		var email_template = 'notificationEmail';
		
		process_data.forEach(function(data){
			console.log("send email")
		    console.log(data)
			switch(data.type){
	            case 'notification':
	                email_template = 'notificationEmail';
	            break;
	            case 'forgotpassword':
	                email_template = 'forgotpasswordEmail';
	            break;
	            case 'welcome':
	                email_template = 'welcomeEmail';
	            break;
        	}
        	// console.log(email_template)
        	var emailData = {
					link: data.params.link,
					recepient_name: data.params.recipient_name,
					content: data.message
				};

			Email.send({
		      to: data.recipient,
		      from: "OurHomestay <homestay.toobler@gmail.com>",
		      subject: data.subject,
		      html: SSR.render(email_template, emailData)
		    });

			Emails.remove({'_id':data._id})
		    // after successfully sent, delete that entry from db
		    // if any error while sending, update the attempted field increment by one
		})
		console.log("email sent")
   }
});


