const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const keys = require('../config/keys'); // hidden file - contains sensitive information

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googeClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
    }
  )
);
