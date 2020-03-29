const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('./../models/User');
const { secret } = require('./config');

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: secret
};

passport.use('jwt', new JWTStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.userId, (err, user) => {
        if (err) {
            done(err);
            return;
        }
        
        if (user) {
            done(null, user);
            return;
        }

        done(null, false);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});