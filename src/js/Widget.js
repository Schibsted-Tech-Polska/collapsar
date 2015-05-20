var btn = require('../blocks/button');
var articleBox = require('../blocks/article-box');
function Widget(container, conf){
  //declarations
  var _container = container;
  var _button = btn({
    text: conf.button.text,
    classes: ['clr-click-more']
  });

  articleBox.render({
    url: conf.mostShared.url,
    header: conf.mostShared.header
  }, function(box){
    _button.parentNode.insertBefore(box, _button.nextSibling);
  });


  var API =  {
    collapse: function(){
      _container.classList.add('clr-container-collapsed');
    },
    expandContainer: function (){
      _container.classList.remove('clr-container-collapsed');
    },
    addBlur: function (){
      _container.classList.add('clr-container-blured');
    },
    removeBlur: function (){
      _container.classList.remove('clr-container-blured');
    },
    renderButton: function (){
      var self = this;
      _button.addEventListener('click', function clickHandler(){
        _button.removeEventListener('click', clickHandler);
        self.hideButton();
        self.expandContainer();
        self.removeBlur();
      });
      _container.parentNode.insertBefore(_button, _container.nextSibling);
    },
    hideButton: function (){
      _button.parentNode.removeChild(_button);
    },
    button: _button
  };
  //initialization
  API.collapse();
  API.renderButton();

  return API;
}


module.exports = Widget;
