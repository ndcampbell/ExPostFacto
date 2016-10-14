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

// Card routes

app.get('/api/cards', function (req, res) {
    var columnid = req.query.columnid;
    var boardid = req.query.boardid;
    var data = db.getCards(columnid, boardid);
    res.status(200).send(JSON.stringify(data));
});

app.post('/api/cards', function(req, res) {
    db.insertCard(req.body);
    res.sendStatus(200).send('OK');
});

app.delete('/api/cards', function(req, res) {
  console.log(req.body);
  db.deleteCard(req.body);
  res.sendStatus(200).send("OK");
});

app.post('/api/card/vote', function(req, res) {
  db.voteCard(req.body);
  res.sendStatus(200).send("OK");

});

// Board routes

app.post('/api/boards', function(req, res) {
  db.addBoard(req.body);
  res.sendStatus(200).send("OK");
});

app.get('/api/boards', function(req, res) {
  var data = db.getBoards();
  res.status(200).send(JSON.stringify(data));
});


app.listen(3001, function() {
    console.log('App listening on port 3001');
});
