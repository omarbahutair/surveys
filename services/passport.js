const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys'); // hidden file - contains sensitive information

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googeClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (_, __, profile, done) => {
      User.findOne({ googleID: profile.id }).then(user => {
        if (user) {
          // the user already registered before
          // skip user creation
          done(null, user);
        } else {
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
