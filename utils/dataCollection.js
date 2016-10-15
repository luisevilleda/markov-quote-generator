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
  },

  useUpperCase: function(wordList) {
    var tmpList = Object.keys(wordList).filter(function(word) {
      return word[0] >= 'A' && word[0] <= 'Z';
    });
    return tmpList[ Math.floor((Math.random()*tmpList.length)) ];
  }

};