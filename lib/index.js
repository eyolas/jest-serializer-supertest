var has = require('lodash.has');
var unset = require('lodash.unset');
var key = '__JEST_SERIALIZER_SUPERTEST__';

const headersToDelete = ['date', 'etag', 'host', 'user-agent'];

module.exports = {
  print(val, serialize) {
    let newVal = Object.assign({ __proto__: val.__proto__ }, val);
    headersToDelete.forEach(function(header) {
      if (has(newVal, "header['" + header + "']")) {
        unset(newVal, "header['" + header + "']");
      }

      if (has(newVal, "headers['" + header + "']")) {
        unset(newVal, "headers['" + header + "']");
      }

      if (has(newVal, "req.header['" + header + "']")) {
        unset(newVal, "req.header['" + header + "']");
      }

      if (has(newVal, "req.headers['" + header + "']")) {
        unset(newVal, "req.headers['" + header + "']");
      }
    });

    if (has(newVal, 'req.url')) {
      delete newVal.req.url;
    }

    // for skip maximum call stack size exceeded
    Object.defineProperty(newVal, key, {
      enumerable: false
    });

    return serialize(newVal);
  },

  test(val) {
    return val && isSupertestValue(val);
  }
};

function isSupertestValue(val) {
  return (
    typeof val === 'object' &&
    typeof val.hasOwnProperty === 'function' &&
    val.hasOwnProperty('header') &&
    val.hasOwnProperty('req') &&
    val.hasOwnProperty('status') &&
    val.hasOwnProperty('text') &&
    !val.hasOwnProperty(key)
  );
}
