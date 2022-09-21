var router = require('express').Router();
var Collection = require('../models/collection'); // collection schema

// Route for deleting user's collection
router.get('/:id', async (req, res) => {
    Collection.findByIdAndDelete(req.params.id, function (err, collection) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ deleted: + collection });
        } 
    });
});

module.exports = router;