var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    if (req.isAuthenticated()){
        var session = req.session;
        if (session.views) {
            session.views++;
            res.setHeader('Content-Type', 'text/html');
            res.write('<p>Просмотров: ' + session.views + '</p>');
            res.write('<p>Истекает через: ' + (session.cookie.maxAge) + 'ms</p>');
            res.end()
        } else {
            session.views = 1;
            res.setHeader('Content-Type', 'text/html');
            res.write('<p>Добро пожаловать, это ваше первое песещение</p>');
            res.end()
        }
    } else {
        res.redirect('/api/fail');
    }
});

module.exports = router;
