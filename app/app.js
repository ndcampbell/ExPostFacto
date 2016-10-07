var express = require('express');
var app = express();


app.use
app.get('/', function (req, res) {
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
    res.send(JSON.stringify(data));
});


app.listen(3001, function() {
    console.log('Example app listening on port 3001');
});
