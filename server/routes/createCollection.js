var router = require('express').Router();
var Collection = require('../models/collection'); // collection schema

// Route for creating a new collection of experiences
router.post('/', async (req, res) => {
	const newCollection = req.body;

    const dbCollection = new Collection({
        title: newCollection.title,
        experiences: newCollection.experiences,
        userId: newCollection.userId,
    });

    dbCollection.save();
    res.json({ message: "Success" });
});

module.exports = router;