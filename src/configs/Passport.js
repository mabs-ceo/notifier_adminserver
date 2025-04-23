const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User.model');



passport.serializeUser((user, done) => {

  const userData = {
    id: user._id,
    name: user.username,
    email: user.email,
  };
  done(null, userData);
});

passport.deserializeUser((userData, done) => {
  

  done(null, userData);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // callbackURL: process.env.GOOGLE_CALLBACK_URL_DEV
  callbackURL: process.env.GOOGLE_GOOGLE_CALLBACK_URL_PRODUCTION
},
async(accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ email: profile.emails[0].value });
    
        if (user) {
          return done(null, user);
        } else {
          // No user found in DB — redirect manually using a custom error
          return done(null, false, { message: 'User not found' });
        }
      } catch (err) {
        return done(err, null);
      }
}));


module.exports = passport;  