var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var db = require('./db.js');

db.createTables();


app.all('*', function(req,res,next) {
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','http://localhost:3000');
    res.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
    res.set('Content-Type', 'application/json');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});

app.use(bodyParser.json())

app.get('/cards', function (req, res) {
    var data = db.getCards();
    res.status(200).send(JSON.stringify(data));
});

app.post('/cards', function(req, res) {
    db.insertCard(req.body);
    res.sendStatus(200).send('OK');
});

app.delete('/cards', function(req, res) {
  console.log(req.body);
  db.deleteCard(req.body);
  res.sendStatus(200).send("OK");
});

app.post('/card/vote', function(req, res) {
  db.voteCard(req.body);
  res.sendStatus(200).send("OK");

});

app.listen(3001, function() {
    console.log('App listening on port 3001');
});
