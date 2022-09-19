var router = require('express').Router();
var Experience = require('../models/experience'); // experience schema

// Route for creating a new experience
router.post('/', async (req, res) => {
	const newExperience = req.body;

    const dbExperience = new Experience({
        title: newExperience.title,
        location: newExperience.location,
        description: newExperience.description,
        userId: newExperience.userId,
    });

    dbExperience.save();
    res.json({ message: "Success" });
});

module.exports = router;