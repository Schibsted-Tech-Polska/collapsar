var template = require('./button.handlebars');
var utils = require('../js/utils');
export default function(params){
  var buttonString = template({
    text: params.text || 'Button text not provided!',
    classes: params.classes ? params.classes.join(' ') : ''
  });
  return utils.stringToDom(buttonString);
}


