var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use('local-login', new LocalStrategy({
        usernameField : 'login',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, login, password, done) {
        if (login == 'admin' && password == '123456'){
            return done(null, JSON.stringify({
                login: login,
                password: password
            }))
        } else {
            return done(null, false);
        }
    }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;