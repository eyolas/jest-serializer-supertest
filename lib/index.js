var key = '__JEST_SERIALIZER_SUPERTEST__';

module.exports = {
  print(val, serialize) {
    delete val.header.date;
    delete val.req.url;

    // for skip maximum call stack size exceeded
    Object.defineProperty(val, key, {
      enumerable: false
    });

    return serialize(val);
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
