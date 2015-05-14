function Widget(container, conf){
    //declarations
    var _container = container;
    var _button = document.createElement('button');

    //some configuration
    _button.innerText = conf.button.text;



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
			_container.appendChild(_button);
		},
		hideButton: function (){
			_button.parentNode.removeChild(_button);
		}
	}
	//initialization
	API.collapse();
	API.renderButton();

	return API;
}


module.exports = Widget;