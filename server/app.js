var express = require('express');
var bodyParser = require('body-parser'); // access post data from client
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');	// authorize users
var cors = require('cors');
var dotenv = require('dotenv');
dotenv.config({path: './.env'});

var app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(cors());
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/createExperience', require('./routes/createExperience'));
app.use('/fetchExperience', require('./routes/fetchExperience'));
app.use('/deleteExperience', require('./routes/deleteExperience'));
app.use('/createCollection', require('./routes/createCollection'));
app.use('/fetchAllCollections', require('./routes/fetchAllCollections'));
app.use('/fetchCollection', require('./routes/fetchCollection'));
app.use('/deleteCollection', require('./routes/deleteCollection'));
app.use('/image', require('./routes/image'));

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rb2mrgc.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => {
		app.listen(5000, () => console.log("Server is live"));
	})
	.catch(err => console.log(err));

// Middleware function to verfiy the json web token
function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]; // Split to remove 'Bearer'

    if (token) {
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
			if (err) return res.json({
                isLoggedIn: false,
                message: "Failed to Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            req.user.email = decoded.email;
            next();
        })
    } else {
        res.json({ message: "Incorrect Token Given", isLoggedIn: false });
    }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
	res.json({ isLoggedIn: true, username: req.user.username});
});

app.get('/getUserInfo', verifyJWT, (req, res) => {
	res.json({ isLoggedIn: true, username: req.user.username, email: req.user.email, id: req.user.id});
});