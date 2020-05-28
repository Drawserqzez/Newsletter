var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
	fs.readFile('./data/users.json', (err, data) => {
		if (err) throw err;

		var users = JSON.parse(data);
		res.send(users);
	});
});

module.exports = router;
