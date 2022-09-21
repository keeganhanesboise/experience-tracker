var router = require('express').Router();
var Experience = require('../models/experience'); // experience schema

// Route for fetching user's experiences
router.get('/:id', async (req, res) => {
    Experience.findByIdAndUpdate({_id: req.params.id}, {}, function (err, experiences) {
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