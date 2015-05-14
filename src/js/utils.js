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
    }
};
