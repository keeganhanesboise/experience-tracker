var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/', function (req, res) {
	res.send('Experience Tracker');
});

app.listen(5000, function () {
	console.log('listening on port 5000');
});