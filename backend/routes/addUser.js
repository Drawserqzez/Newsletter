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
        // newUser.id = (newUser.id === 0 || undefined === newUser.id) ? users.length + 1 : newUser.id;

        newUser.password = crypto.AES.encrypt(
            newUser.password, 
            salt
        ).toString();

        // console.log(newUser);
        
        users.push(newUser);

        var saveUsers = JSON.stringify(users, null, 2);

        fs.writeFile('./data/users.json', saveUsers, (err, data) => {
            if (err) throw err;
        });

        res.type('json');
        res.status(201).send(JSON.stringify(newUser));
    });
});

router.get('/', function(req, res) {
    res.redirect('/');
});

module.exports = router;