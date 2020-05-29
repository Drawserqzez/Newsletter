var express = require('express');
var router = express.Router();
var fs = require('fs');
var crypto = require('crypto-js');

router.post('/', (req, res) => {
    // if (err) throw err;
    var salt = 'Salta era lösenord!';

    var infoToCheck = req.body;
        
    // console.log(infoToCheck);
    var loggedIn = false;
    
    fs.readFile('./data/users.json', (err, data) => {
        if (err) throw err;

        var users = JSON.parse(data);

        users.forEach((user) => {
            var passwordBytes = crypto.AES.decrypt(user.password, salt);
            var password = passwordBytes.toString(crypto.enc.Utf8);
            // console.log(password);

            loggedIn = (
                user.userName === infoToCheck.userName 
                &&
                password === infoToCheck.password
            );
            // console.log(loggedIn);

            if (loggedIn) {
                res.send(loggedIn);
            }
        });

        if (!loggedIn) {
            res.sendStatus(403);
        }
    });
});

module.exports = router;