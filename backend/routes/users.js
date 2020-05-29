var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
	fs.readFile('./data/users.json', (err, data) => {
		if (err) throw err;

		var users = JSON.parse(data);
		var usersToSend = [];

        users.forEach((user) => {
            var tempUser = {
				"id": user.id, 
				"userName": user.userName, 
				"userLevel": user.userLevel,
				"isSubscribed": user.isSubscribed
			};
			
			usersToSend.push(tempUser);
        });

		res.send(usersToSend);
	});
});

router.get('/:id', (req, res) => {
	fs.readFile('./data/users.json', (err, data) => {
		if (err) throw err;

		var users = JSON.parse(data);

		var user = users.find(x => x.id == req.params.id);
		var userToSend = { 
			"id": user.id, 
			"userName": user.userName, 
			"userLevel": user.userLevel,
			"isSubscribed": user.isSubscribed
		};

		res.send(userToSend);
	});
});

module.exports = router;
