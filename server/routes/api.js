var express = require('express');
var router = express.Router();
var passport = require('./../components/auth.js');

router.get('/', function(req, res) {
    if (req.isAuthenticated()){
        res.redirect('/');
    } else {
        res.redirect('api/login');
    }
});

router.get('/login', passport.authenticate('local-login', {
    successRedirect : '/users',
    failureRedirect : '/api/fail'
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/success', function(req, res) {
    if (req.isAuthenticated()){
        res.end(JSON.stringify({
            message: 'authentication successful',
            code: 200
        }));
    } else {
        res.end(JSON.stringify({
            message: 'access denied',
            code: 401
        }));
    }
});

router.get('/fail', function(req, res) {
    if (!req.isAuthenticated()){
        res.end(JSON.stringify({
            message: 'authentication failed',
            code: 400
        }));
    } else {
        res.redirect('/api/success');
    }
});

module.exports = router;