var router = require('express').Router();
var Collection = require('../models/collection'); // collection schema

// Route for fetching user's collections
router.get('/:userId', async (req, res) => {
    Collection.find({userId: req.params.userId}, function (err, collections) {
        if (err) {
            res.json({ message: err });
        } else if (collections.length === 0) {
            res.json({ message: "No Data Found" });
        } else {
            res.json(collections);
        }
    });
});

module.exports = router;