var express = require('express');
var request = require('request');
var ASQ = require('asynquence');

var app = express();

function createMiddleware(config){
  app.get('/', handleRequest);

  var cached;
  var ttl = 5 * 60 * 1000; //time to live
  var sndApi = require('./components/snd-api')({
    SND_API_KEY: config.SND_API_KEY,
    SND_API_SECRET: config.SND_API_SECRET
  });

  function handleRequest(req, res){

    if(cached && cached.expires > now()){
      //get from cache
      res.send(cached.content);
    } else {
      //get from source
      console.log('most shared articles fetched from source');
      getMostShared().
        then(function(_, mostShared){
        //sort reposne from webhits
        var best = mostShared.sort(function(a, b){
          return b.total_count - a.total_count;
        })
        //add article id to Object => used when merging response from SND
        .map(function(article){
          article.id = getIdOfArticle(article);
          return article;
        })
        //remove those for which regexp didn't work
        .filter(function(article){
          return article.id;
        })
        //get only five elements
        .slice(0, 5);

        //array of best IDs
        var ids = best.map(function(article){
          return article.id;
        });

        //fetchArticles gets array of ids as first parameter
        sndApi.fetchArticles(ids, function(err, data){
          // adding image to most shared articles
          var merged = best.map(function(article){
            article.imageUrl = data[article.id];
            return article;
          });
          //add to cache
          cached = { content: merged, expires: now() + ttl};
          res.send(merged);
        });

      });
    }

  }


  return app;
}

function getMostShared(){
  return ASQ(function(done){
    request('https://webhit.snd.no/webhit/reports/mostshared.json.php?range=today', function(err, response, data){
      done(JSON.parse(data));
    });
  });
}


function getIdOfArticle(article){
  var reg = /article(.*)\.ece/;
  var match = reg.exec(article.url);
  return match ? match[1] : 0;
}

function now(){
  return (new Date()).getTime();
}

module.exports = createMiddleware;
