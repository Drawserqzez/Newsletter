var express = require('express');
var router = express.Router();
var fs = require('fs');
var crypto = require('crypto-js');

// Uses POST to verify the login-details provided.
router.post('/', (req, res) => {
    var salt = 'Salta era lösenord!';

    var infoToCheck = req.body;
        
    var loggedIn = false;
    
    fs.readFile('./data/users.json', (err, data) => {
        if (err) throw err;

        var users = JSON.parse(data);
        var isUserAdmin = false;
        var loggedInUser = null;

        for (var user of users) {
            var passwordBytes = crypto.AES.decrypt(user.password, salt);
            var password = passwordBytes.toString(crypto.enc.Utf8);

            loggedIn = (
                user.userName === infoToCheck.userName 
                &&
                password === infoToCheck.password
            );

            if (loggedIn) {
                isUserAdmin = user.userLevel === 'admin';
                loggedInUser = user;
                delete loggedInUser.password;
                break;
            }
        };
        
        res.type('json');
        res.send({ 
            "loginSuccessful": loggedIn,
            "isUserAdmin": isUserAdmin,
            "loggedInUser": loggedInUser
        });
    });
});

module.exports = router;