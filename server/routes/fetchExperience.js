var router = require('express').Router();
var Experience = require('../models/experience'); // experience schema

// Route for fetching user's experiences
router.get('/:userId', async (req, res) => {
    Experience.find({userId: req.params.userId}, function (err, experiences) {
        if (err) {
            res.json({ message: err });
        } else if (experiences.length === 0) {
            res.json({ message: "No Data Found" });
        } else {
            res.json(experiences);
        }
    });
});

module.exports = router;