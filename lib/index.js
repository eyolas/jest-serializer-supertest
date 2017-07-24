var key = '__JEST_SERIALIZER_SUPERTEST__';

module.exports = {
  print(val, serialize) {
    let newVal = Object.assign({ __proto__: val.__proto__ }, val);
    delete newVal.header.date;
    delete newVal.req.url;

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
    val.hasOwnProperty('header') &&
    val.hasOwnProperty('req') &&
    val.hasOwnProperty('status') &&
    val.hasOwnProperty('text') &&
    !val.hasOwnProperty(key)
  );
}
