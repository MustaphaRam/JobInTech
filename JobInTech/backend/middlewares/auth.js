// auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwtSecret = 'f5dd9bb1a8de65d0055590effd69e57c2e1f37139bfcad004485ca755eaf32d5b216421cf68a4b03841104d6cff68c328fbf9a41ddbabd42625752b9a8a70d72';
const User = require('../Models/User');
const bcrypt = require('bcrypt');

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// JWT Strategy
passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
    }, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

/* passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in the session
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
}); */

module.exports = passport;
