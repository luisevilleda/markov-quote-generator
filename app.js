var express = require('express');
var bodyParser = require('body-parser');
var Url = require('url');
var validation = require('./utils/validation');
var dataCollection = require('./utils/dataCollection');
var MarkovChain = require('markovchain');

var app = express();

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//End Middleware

//Routes
app.get('/', function(req, res) {
  res.sendStatus(200);
});

app.post('/', function(req, res) {
  var person = req.body.person.toLowerCase();
  dataCollection.collectName(person);

  res.redirect('/quotes?person=' + person);
});

app.get('/quotes', function(req, res) {
  validation.urlParam(req.query, function(err, person) {
    if (err) {
      res.redirect('/');
    } else {
      res.sendFile('quotes.html', {root: './public'});
    }
  });
});

app.post('/quotes', function(req, res) {
  var person = validation.getPostParam(req.url);
  dataCollection.collectQuotes(person, req.body.quote);
  res.redirect('/quotes?person=' + person);
});

app.get('/generate', function(req, res) {
  validation.urlParam(req.query, function(err, person) {
    if (err) {
      res.redirect('/');
    } else {
      res.sendFile('generate.html', {root: './public'});
    }
  });
});

app.get('/data/*', function(req, res) {
  var person = validation.getGeneratorPerson(req.url);
  var data = dataCollection.readTxt(person);
  var quoteGen = new MarkovChain(data);
  var quote = quoteGen.start('The').end(5).process();
  res.send( quote );
});


app.listen(3000);