var Promise = require('bluebird');

/**
 * Write your own version of `Promise.all`
 *
 * Given an array which contains promises, return a promise that is
 * fulfilled when all the items in the array are fulfilled.
 *
 * The promise's fulfillment value is an array with fulfillment values
 * at respective positions to the original array.
 *
 * If any promise in the array rejects, the returned promise
 * is rejected with the rejection reason.
 */

var promiseDotAll = function (arrayOfPromises) {
  // YOUR CODE HERE
  var returnValues = []

  var err = null
  var i = 0;
  var promiseTraversal = function(cb) {
    if (i === arrayOfPromises.length) {
      cb(null, returnValues)
      return
    }
    arrayOfPromises[i].then(function(value) {
      console.log("VALUE")
      console.log(value)
      returnValues.push(value);
      i++;
      promiseTraversal(cb);
    }).catch(function(error) {
      err = error;
      cb(error, null)
    })
  }
  var promisifiedPromiseTraversal = Promise.promisify(promiseTraversal);
  return promisifiedPromiseTraversal;
  return new Promise(function(resolve, reject){
    promisifiedPromiseTraversal()
  })
};

module.exports = promiseDotAll;
