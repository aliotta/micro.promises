// Read through `demo/PromiseDotAll.js` before completing this exercise

var fs = require('fs');
var Promise = require('bluebird');
var readFile = require('./readFileWithPromise');

/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 *
 * Make sure combineFirstLineOfManyFiles returns a promise so the following will work:
 *
 * combineFirstLineOfManyFiles(someFiles, someWritePath)
 *   .then(function() {
 *     // Any work done here is guaranteed to occur **after**
 *     // the new file has been successfully written
 *   })
 */

var combineFirstLineOfManyFiles = function (filePaths, writePath) {
  // YOUR CODE HERE
  var array = [];
  for (var i = 0; i < filePaths.length; i++) {
    array.push(readFile(filePaths[i]));
  };
  return Promise.all(array)
  .then(function(contents){
    var string = ""
    for (var i = 0; i < contents.length; i++) {
      string += contents[i].toString().split('\n')[0]
      if (i !== contents.length - 1) {
        string += "\n"
      }
    };
    console.log("STRING" + string)
    return Promise.promisify(fs.writeFile)(writePath, string);
  })
  // .catch( function() {con sole.log("error")});
};

module.exports = combineFirstLineOfManyFiles;
