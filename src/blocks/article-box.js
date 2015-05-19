var utils = require('../js/utils');
var template = require('./article-box.handlebars');
export function render(jsonUrl, done){
  utils.ajax(jsonUrl,
             (code, responseText) => {
               var rendered = template({
                 articles: convertResponse(responseText)
               });
               done(utils.stringToDom(rendered));
             });
}
function convertResponse(response){
  return JSON.parse(response);

}

function getIdOfArticle(link){
  var reg = /article(.*)\.ece/;
  var match = reg.exec(link);
  return match ? match[1] : '0';
}
