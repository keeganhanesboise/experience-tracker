var express = require('express');
var bodyParser = require('body-parser'); // access post data from client
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');	// authorize users
var bcrypt = require('bcrypt');	// hashes pass saved to database and verifies login token
var cors = require('cors');
var dotenv = require('dotenv');
var User = require('./models/user'); // user schema
dotenv.config({path: './.env'});

var app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(cors());

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rb2mrgc.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => {
		app.listen(process.env.PORT, () => console.log("Server is live"));
	})
	.catch(err => console.log(err));

app.get('/', function (req, res) {
	res.send("Experience Tracker");
});