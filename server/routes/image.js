var router = require('express').Router();
const controller = require("../controller/file.controller");

// Route for fetching user's collection
router.post('/upload', controller.upload);
router.get('/files/', controller.getListFiles);
router.get('/files/:name', controller.download);

module.exports = router;