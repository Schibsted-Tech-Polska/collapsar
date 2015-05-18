var utils = require('../js/utils');
var template = require('./article-box.handlebars');
export function render(done){
  utils.ajax('http://localhost:3000/',
             (code, responseText) => {
               var rendered = template({
                 articles: convertResponse(responseText)
               });
               console.log(convertResponse(responseText));
               done(utils.stringToDom(rendered));
             });
}
function convertResponse(response){
  return JSON.parse(response).
      sort((a, b) => b.total_count - a.total_count).
      slice(0,4).
      map(article => ({
        title: article.title,
        url: article.url,
        image: generateImageLink(getIdOfArticle(article.url))
      }));

}

function getIdOfArticle(link){
  var reg = /article(.*)\.ece/;
  var match = reg.exec(link);
  return match ? match[1] : '0';
}

function generateImageLink(id){
  console.log(id);
  return 'http://ap.mnocdn.no/incoming/article' + id + '.ece/ALTERNATES/w480c169/';
}
