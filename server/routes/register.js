var router = require('express').Router();
var bcrypt = require('bcrypt');	// hashes pass saved to database and verifies login token
var User = require('../models/user'); // user schema

// Route for registering a new user
router.post('/', async (req, res) => {
	const user = req.body;

	// Verify user and email aren't already taken
	const takenUser = await User.findOne({ username: user.username });
	const takenEmail = await User.findOne({ email: user.email });

	if (takenUser || takenEmail) {
		res.json({ message: "User/Email already taken", success: false});
	} else {
		// (1024 rounds of hashing) increase for security, decrease for performance
		user.password = await bcrypt.hash(req.body.password, 10);
		
		const dbUser = new User({
			username: user.username.toLowerCase(),
			email: user.email.toLowerCase(),
			password: user.password
		});

		dbUser.save();
		res.json({ message: "Success", success: true });
	}
});

module.exports = router;