

// Facebook
ServiceConfiguration.configurations.remove({
  service: 'facebook'
});
ServiceConfiguration.configurations.upsert(
  {service: "facebook"},
  {$set: {
    appId: '1572035746420625',
    secret: 'deb50982f744ee0af38d4f263ad2ebef',
    requestPermissions: ['public_profile', 'email', 'user_about_me', 'user_birthday', 'user_likes', 'user_location', 'user_friends']
  }
  }
);

// Google
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "GOOGLE_CLIENT_ID",
  secret: "GOOGLE_SECRET_CODE"
});

// Twitter
ServiceConfiguration.configurations.remove({
  service: "twitter"
});
ServiceConfiguration.configurations.insert({
  service: "twitter",
  consumerKey: "TWITTER_KEY",
  secret: "TWITTER_SECRET_CODE"
});
