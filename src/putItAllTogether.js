var Promise = require('bluebird');
var lib = require('../lib/putItAllTogetherHelpers.js');
var _ = require('underscore');

/**
 *
 * Time to put everything we've learned together!
 * 
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of tags between
 * multiple github profile pictures
 * 
 * Given an array of github handles, putItAllTogether should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of tags for each avatar_url (requires authentication)
 *   5) find the intersection of the tags
 * 
 * Don't worry, much of the heavy lifting has been done already
 * in the `lib` module. You just have to wire everything up together!
 * Here's a list of methods you can access:
 * 
 *   authenticateImageTagger() =>
 *     @return {Promise} - resolves with the token required for tagImage()
 * 
 *   getGitHubProfile(handle) =>
 *     @param {String} handle - the handle of a GitHub user
 *     @return {Promise} - resolves with the user's profile in the following format:
 *       {
 *         handle: 'danthareja',
 *         name: 'Dan Thareja', 
 *         avatarUrl: 'https://avatars.githubusercontent.com/u/6980359?v=3.jpg'
 *       }
 * 
 *   tagImage(imageUrl, token) =>
 *     @param {String|Array} imageUrl - the url(s) of the image you want to tag
 *     @param {String} token - the authentication token
 *     @return {Promise} - resolves with an array of tags
 *        If imageUrl is a string, expect a single array of tags
 *        If imageUrl is an array, expect a nested array of tas
 * 
 *   getIntersection(arrays) =>
 *     @param {Array} arrays - an array of arrays, each containing a set of values
 *     @return {Array} - a single array with the intersection of values from all arrays
 * 
 * Once you pass this one, you'll be a promise chaining master! Have fun!
 * Hint: Bluebird's collection methods could prove handy here
 */

// We're using Clarifai's API to recognize different an image into a list of tags
// Visit the following url to sign up for a free account
//     https://developer.clarifai.com/accounts/login/?next=/applications/
// Then, create a new Application and pass your Client Id and Client Secret into the method below
lib.setImageTaggerCredentials('wHUgiWuzs93sGnz9ZXZtrO72ayw21THaLyGYuVWN', 'ZtKT5a7hsDw8oN3cgRSXs6FdOSFErDCCHRQdmNSw')

var putItAllTogether = function(githubHandles) {
  lib.setImageTaggerCredentials('wHUgiWuzs93sGnz9ZXZtrO72ayw21THaLyGYuVWN', 'ZtKT5a7hsDw8oN3cgRSXs6FdOSFErDCCHRQdmNSw')
 
  return Promise.all([lib.authenticateImageTagger(), Promise.map(githubHandles, lib.getGitHubProfile)])
  .then(function(values) {
    token = values[0]
    profiles = values[1]
    images = []
    for (var i = 0; i < profiles.length; i++) {
      images.push(profiles[i].avatarUrl)
    };
    return lib.tagImage(images, token);
  })
  .then(function(tagArrays) {
    return _.uniq(_.flatten(tagArrays))
  })

  // .then( function(profiles){
  //   var output = ['men'];
  //   console.log("Profiels: ", profiles)

  //   lib.tagImage(profiles.avatarUrl, )
  //   return output;
  // }) 
   
 
};

module.exports = putItAllTogether;
