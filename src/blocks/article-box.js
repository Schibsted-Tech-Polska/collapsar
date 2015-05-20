var utils = require('../js/utils');
var template = require('./article-box.handlebars');
export function render(jsonUrl, done){
  utils.ajax(jsonUrl,
             (code, responseText) => {
               var responseJson = JSON.parse(responseText);
               var responseHtml = '<span></span>';
               if(responseJson.length){
                 responseHtml = template({
                   articles: responseJson
                 });
                 done(utils.stringToDom(responseHtml));
               } else {
                 done(utils.stringToDom(responseHtml));
               }
             });
}


function getIdOfArticle(link){
  var reg = /article(.*)\.ece/;
  var match = reg.exec(link);
  return match ? match[1] : '0';
}
