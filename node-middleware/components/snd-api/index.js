var security = require('./security');
var request = require('request');
var converter = require('./converter');


function config(cfg){
  var SNDConf = cfg;

  var generateSndRequestOptions = function () {
    return {
      headers: {
        'Accept': 'application/json',
        'x-snd-apikey': SNDConf.SND_API_KEY,
        'x-snd-apisignature': security.sign(SNDConf.SND_API_SECRET, security.signatureText())
      }
    };
  };

  function fetchArticles(ids, callback) {
    var options = generateSndRequestOptions();
    options.url =
      'http://api.snd.no/news/v2/publication/ap/searchContents/collection?contentIds=' +
    ids.join(',');
    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        body = JSON.parse(body);
        callback(null, converter.parse(body.entries));
      } else {
        var errorMessage = "Snd API request error. Http status " + response.statusCode;
        callback(errorMessage);
      }
    });
  }


  return {
    fetchArticles: fetchArticles
  };
}

module.exports = config;
