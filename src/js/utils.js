module.exports = {
  extend: function extend(dst, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        //if property is object then recursively extend it
        if (typeof src[key] === 'object') {
          dst[key] = extend(dst[key], src[key]);
        } else {
          dst[key] = src[key];
        }
      }
    }
    return dst;
  },
  //only supports getting
  ajax: function (url, callback) {
    var httpRequest;

    //define httpRequest
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //define what to do when connection is ready
    httpRequest.onreadystatechange = function() {
      var err = {};
      var response;
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          response = httpRequest.responseText;
        } else {
         err.message = 'Not found';
        }
      } else {
        // err.message = 'Not ready';
      }
      //prevent from returning response too early
      if (response !== undefined || err.message !== undefined) {
        callback(err, response);
      }
    };

    //send request
    httpRequest.open('GET', url, true);
    httpRequest.setRequestHeader("Accept", "application/json");
    httpRequest.send();

  },
  stringToDom: function(str){
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.firstChild;
  }

};
