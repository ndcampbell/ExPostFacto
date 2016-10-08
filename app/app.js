var express = require('express');
var app = express();
//var db = require('./db.js');

//db.createTables;

app.get('/v1/cards', function (req, res) {
    var data = [
        {
            title: "test card 1",
            description: "this is test one",
        },
        {
            title: "test card 2",
            description: "this is test two",
        },
        {
            title: "test card 4",
            description: "this is test two",
        }
    ];
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(data));
});

app.post('/v1/cards', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send('OK');
});

app.listen(3001, function() {
    console.log('Example app listening on port 3001');
});
