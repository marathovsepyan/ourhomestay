// smtp config
Meteor.startup(function () {
  smtp = {
    username: "homestay.toobler@gmail.com", // eg: server@gentlenode.com
    password: "homestaytblr2016", // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});