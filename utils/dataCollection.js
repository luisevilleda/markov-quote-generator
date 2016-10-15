var express = require('express');
var fs = require('fs');

module.exports = {

  collectName: function(person) {

    fs.access('data/' + person, function(err, result) {
      if (err) {
        fs.mkdirSync('data/' + person);
        fs.writeFileSync('data/' + person + '/quotes.txt', '');
      }
    });
  },

  collectQuotes: function(person, quote) {
    fs.appendFileSync('data/' + person + '/quotes.txt', ' ' + quote);
  },

  readTxt: function(person) {
    return fs.readFileSync('data/' + person + '/quotes.txt', 'utf8');
  }



};