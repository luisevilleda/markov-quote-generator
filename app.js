var express = require('express');
var bodyParser = require('body-parser');
var MarkovChain = require('markovchain');

var app = express();

//Global variable for name and text
  //TODO: put in database
var people = {};
var currentPerson;

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
  person = req.body.person.toLowerCase();
  currentPerson = person;

  if (!people.hasOwnProperty(person)) {
    people[person] = {text: ''};
  }
  res.redirect('/quotes');
});

app.get('/quotes', function(req, res) {
  res.sendfile('quotes.html', {root: './public'});
});

app.post('/quotes', function(req, res) {
  people[currentPerson].text += ' ' + req.body.quote;
  console.log(people[currentPerson].text);
});

app.get('/generate', function(req, res) {
  console.log('person: ', person[currentPerson]);
  res.sendfile('generate.html', {root: './public'});
  people[currentPerson].quotes = new MarkovChain(people[currentPerson].text);
  console.log(people[currentPerson].quotes);
});

app.post('/generate', function(req, res) {
  console.log(people[currentPerson]);
  // res.send( people[currentPerson].quotes.start('This').end(15).process() );
  res.send( JSON.stringify(people[currentPerson].quotes) );
});


app.listen(3000);