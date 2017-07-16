module.exports = {
  print(val, serialize) {
    delete val.header.date;
    delete val.req.url;
    val.__parsed__ = true;
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
    !val.hasOwnProperty('__parsed__')
  );
}
