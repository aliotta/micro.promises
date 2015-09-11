// Read through `demo/chainingWithPromises.js` before completing this exercise

var fs = require('fs');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

// Using `fs.writeFile`, the `request` module, and promises,
// build out `getFromAPIAndWriteToFile` to hit an API's GET request endpoint,
// and write the body of its response to a file whose path is passed in
var getFromAPIAndWriteToFile = function (apiURL, writeFilePath) {
  request(apiURL)
  .then(function(contents){
    Promise.promisify(fs.writeFile)(writeFilePath, contents)
  });
};

module.exports = getFromAPIAndWriteToFile;
