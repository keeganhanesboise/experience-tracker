var router = require('express').Router();
var Collection = require('../models/collection'); // collection schema

// Route for fetching user's collections
router.get('/:id', async (req, res) => {
    Collection.find({_id: req.params.id}, function (err, collection) {
        if (err) {
            res.json({ message: err });
        } else if (collection.length === 0) {
            res.json({ message: "No Collection Found" });
        } else {
            res.json(collection);
        }
    });
});

module.exports = router;