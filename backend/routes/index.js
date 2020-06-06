var express = require('express');
var router = express.Router();

/* GET the empty home page. */
router.get('/', function(req, res, next) {
    res.send('');
});

module.exports = router;
