import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email'
import { Emails } from './email.js';

export const saveMailData = new ValidatedMethod({
    name: 'emails.createBooking',
    validate:   null,
    run(options) {
    	options.params["link"] = "http://52.42.62.56:3000/";
    	console.log("options")
    	console.log(options)
        let data = {
            recipient : options.recipient,
		    subject    : options.subject,
		    message    : options.message,
		    params     : options.params,
		    created_At : new Date(),
		    attempts   : 0,
		    max_attempts : 3,
		    mail_template : options.mail_template
        }
        let email = Emails.insert(data);
        console.log("email")
        console.log(email)
        return email
    }
});