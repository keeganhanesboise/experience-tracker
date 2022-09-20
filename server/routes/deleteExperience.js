var router = require('express').Router();
var Experience = require('../models/experience'); // experience schema

// Route for fetching user's experiences
router.get('/:id', async (req, res) => {
    Experience.findByIdAndDelete(req.params.id, function (err, experience) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ deleted: + experience });
        } 
    });
});

module.exports = router;