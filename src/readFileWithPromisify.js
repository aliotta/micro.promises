// Even though Promises are native in ES6, not all environments support them yet,
// so we will use the Bluebird library in this sprint.
var Promise = require('bluebird');
var fs = require('fs');

// var filePath = __dirname + '/../lib/file_to_read';

// Here's a built-in node function that accesses the file system
// It's an asyncronous function, so it accepts a callback as it's last argument
// All of node's async functions use the same the (...args, callback) pattern
// Notice that `callback` follows a specific pattern of (err, result)

// Set `readFileWithPromisify` to be a promisified version of `fs.readFile`
var readFileWithPromisify = function(filePath) {
  return Promise.promisify(fs.readFile)(filePath)
};

module.exports = readFileWithPromisify;
