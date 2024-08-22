// cannot find module 'request' Error Solution
// https://stackoverflow.com/questions/16482600/node-js-cannot-find-module-request

var request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); // Print the google web page.
  }
});
