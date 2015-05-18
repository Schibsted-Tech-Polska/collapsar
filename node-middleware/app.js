var express = require('express');

var routes = require('./routes/index');

var app = express();

//cors
//app.use(function(req, res, next) {
    //res.header('Access-Control-Allow-Origin', '*');
    //next();
//});

app.get('/', handleRequest);

function handleRequest(req, res){
  request('https://webhit.snd.no/webhit/reports/mostshared.json.php?range=today', function(err, response, data){
      res.send(data);
  });
}

module.exports = app;
