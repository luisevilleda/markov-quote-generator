var checkFolder = require('./dataCollection').collectName;
var Url = require('url');

module.exports = {

  urlParam: function(params, cb) {
    if(params.person) {
      checkFolder(params.person);
      cb(null, params.person);
    } else {
      cb(new Error('Person not found, please re-enter a name.'));
    }
  },

  getPostParam: function(url) {
    var urlObj = Url.parse(url, true);
    var params = urlObj.query;
    if (params.person) {
      return params.person;
    } else {
      return null;
    }

  }


};