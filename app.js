var express = require('express');
var bodyParser = require('body-parser');
var Url = require('url');
var validation = require('./utils/validation');
var dataCollection = require('./utils/dataCollection');
var MarkovChain = require('markovchain');
var fs = require('fs');

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
  dataCollection.collectQuotes(person, req.body.quotes);
});

app.get('/data/*', function(req, res) {
  var person = validation.getGeneratorPerson(req.url);
  var data = dataCollection.readTxt(person);
  var quoteGen = new MarkovChain(data);
  // fs.writeFileSync('data/' + person + '/quoteGen.txt', JSON.stringify(quoteGen));

  // console.log(quoteGen);
  var quote = quoteGen.start(dataCollection.useUpperCase).end().process();
  res.send( quote );
});


app.listen(3000);