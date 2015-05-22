var express = require('express');
var path = require('path');


var routes = require('./routes/index');

var collapsr = require('../node-middleware/app');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/collapsr', collapsr({
  snd: require('./config'),
  mostShared: {
    url: 'https://webhit.snd.no/webhit/reports/mostshared.json.php?range=today',
    counter: 'total_count'
  }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = 5555;
app.listen(port);
console.log('Test server started on port: ' + port);
