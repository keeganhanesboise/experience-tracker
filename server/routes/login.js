var router = require('express').Router();
var bcrypt = require('bcrypt');	// hashes pass saved to database and verifies login token
var User = require('../models/user'); // user schema
var jwt = require('jsonwebtoken');	// authorize users

// Route for logging in as an exisiting user
router.post('/', (req, res) => {
    const userLoggingIn = req.body;

    // Search database for username
    User.findOne({ username: userLoggingIn.username })
        .then((dbUser) => {
            if (!dbUser) {
                return res.json({
                    message: "Invalid Username or Password"
                });
            }

            // Check if passwords match
            bcrypt.compare(userLoggingIn.password, dbUser.password)
            .then((isCorrect) => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username,
                        email: dbUser.email,
                    }

                    // Create JSON web token
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET, // key used for encryption
                        {expiresIn: 86400}, // one day (in seconds)
                        (err, token) => {
                            if (err) return res.json({ message: err })
                            return res.json({
                                message: "Success",
                                // other authentification methods include Basic and Digest 
                                // (utilize username and secret key instead of token)
                                token: "Bearer " + token 
                            });
                        }
                    )
                } else {
                    return res.json({
                        message: "Invalid Username or Password"
                    });
                }
            })
        })
});

module.exports = router;