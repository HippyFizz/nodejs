var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session');

var index = require('./routes/index'),
    users = require('./routes/users'),
    api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'it_is_a_true_secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
        //expires: new Date(Date.now() + 60000)
    }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    /*var err = new Error('Not Found');
    err.status = 404;
    next(err);*/
    res.end(JSON.stringify({
        message: 'Not Found',
        code: 404
    }));
});

// error handler
app.use(function(err, req, res, next) {
    /*// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');*/
    res.end(JSON.stringify({
        message: 'internal server error',
        code: 500
    }));
});

module.exports = app;
module.exports.test = passport.Authenticator;