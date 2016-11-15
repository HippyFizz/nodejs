var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    crypto = require('crypto'),
    Database = require('./database.js'),
    db = new Database();

passport.use('local-login', new LocalStrategy({
        usernameField : 'login',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, login, password, done) {
        db.connect();
        db.getUser(login, function (user) {
            if (user){
                var hash = crypto.createHash('md5').update(password).digest('hex');
                if (hash == user.password){
                    return done(null, {
                        id: user.id,
                        username: user.username,
                        login: user.login,
                        permission: user.permission
                    });
                } else {
                    return done(null, false);
                }
            }
        });
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