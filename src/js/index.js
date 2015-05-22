
var utils = require('./utils');
var Widget = require('./widget');
//private stuff

function setup(container, config){
  if(container === undefined) { return console.error('[shortener]: You need to provide container.');}

  //default values
  var defaultValues = {
  	defaultCss: true,
    visibleHeight: 100,
    button: {
      text: "Fortsette lesingen",
      cssClass: 'read-more-button'
    },
    mostShared: {
      header: 'Mest delte artikler',
      counter: 'total_count',
      counterLabel: 'x liker denne'
    }
  };
  var options = utils.extend(defaultValues, config);

  if(options.defaultCss) { require('../css/main.scss'); }
  require('../css/core.scss');

  return Widget(container, options);
}

//Public API
module.exports = setup;
