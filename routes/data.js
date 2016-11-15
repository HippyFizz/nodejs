var express = require('express');
var router = express.Router();
var passport = require('./auth.js');

/* GET data listing. */
router.get('/', passport.authenticate('local-login', {
    successRedirect : '/data/done',
    failureRedirect : '/data/fail'
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/test', function(req, res) {
    console.log(req.isAuthenticated());
    res.end('login done');
});

router.get('/done', function(req, res) {
    console.log(req.isAuthenticated());
    res.end('login done');
});

router.get('/fail', function(req, res) {
    res.end('login fail');
});

router.get('/getUserName', function(req) {
    console.log(req.query);
});


module.exports = router;