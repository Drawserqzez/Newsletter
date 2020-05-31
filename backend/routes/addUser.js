var express = require('express');
var router = express.Router();
var fs = require('fs');
var crypto = require('crypto-js');

router.post('/', function(req, res) {
    fs.readFile('./data/users.json', (err, data) => {
        if (err) throw err;
        var salt = 'Salta era lösenord!';

        var users = JSON.parse(data);
        
        // var newUser = JSON.parse(req.body);
        var newUser = req.body;
        newUser.id = users.length + 1;

        newUser.password = crypto.AES.encrypt(
            newUser.password, 
            salt
        ).toString();

        newUser.userLevel = 'user';

        // console.log(newUser);
        var shouldAddUser = true;

        for (var user of users) {
            shouldAddUser = (
                newUser.userName !== user.userName
                && newUser.email !== user.email
            );

            if (!shouldAddUser) {
                break;   
            }
        }
        
        if (shouldAddUser) {
            users.push(newUser);
    
            var saveUsers = JSON.stringify(users, null, 2);
    
            fs.writeFile('./data/users.json', saveUsers, (err, data) => {
                if (err) throw err;
            });
            
            delete newUser.password;
            res.type('json');
            res.status(201).send(JSON.stringify(newUser));
        }
        else {
            res.status(403).send('En användare med det namnet eller mejladressen finns redan.');
        }
    });
});

router.get('/', function(req, res) {
    res.redirect('/');
});

module.exports = router;