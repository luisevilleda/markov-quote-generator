var express = require('express');
var bodyParser = require('body-parser');
var MarkovChain = require('markovchain');
var Url = require('url');
var validation = require('./utils/validation');
var session = require('express-session')

var dataCollection = require('./utils/dataCollection');

var app = express();

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
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

// app.post('/generate', function(req, res) {
//   var person = validation.getPostParam(req.url);
//   console.log(people[currentPerson]);
//   // res.send( people[currentPerson].quotes.start('This').end(15).process() );
//   res.send( JSON.stringify(people[currentPerson].quotes) );
// });


app.listen(3000);