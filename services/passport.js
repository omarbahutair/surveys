const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys'); // hidden file - contains sensitive information

const User = mongoose.model('user');

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
      proxy: true,
    },
    async (_, __, profile, done) => {
      const user = await User.findOne({ googleID: profile.id });

      if (user) {
        // user already signed up before
        // skip creation
        done(null, user);
      }

      const newUser = await new User({ googleID: profile.id }).save();

      done(null, newUser);
    }
  )
);
