var express = require('express');
var router = express.Router();
var fs = require('fs');

// GET all users. Passwords and email are left out of the return for security reasons.
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

// GET specific user based on ID. Passwords and email are left out here as well
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

// PUT that changes the subscriptionstaus of the user with the specified id.
// returns the new subscription status so that the Vue application can change the status.
router.put('/changeSubscription/:id', (req, res) => {
	fs.readFile('./data/users.json', (err, data) => {
		if (err) throw err;

		var users = JSON.parse(data);

		var userToUpdate = users.find(x => x.id == req.params.id);

		userToUpdate.isSubscribed = !userToUpdate.isSubscribed;
		console.log(userToUpdate);

		var updatedData = JSON.stringify(users, null, 2);

		fs.writeFileSync('./data/users.json',updatedData, (err, data) => {
			if (err) throw err;
		});
				
		res.status(201).send(userToUpdate.isSubscribed);
	})
})

module.exports = router;
