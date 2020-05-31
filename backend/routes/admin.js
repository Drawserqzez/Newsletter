var express = require('express');
var router = express.Router();
var axios = require('axios');
var fs = require('fs');

router.get('/', (req, res) => {
    var user = req.body;

    axios.post('http://localhost:3000/login', {
        "userName": user.userName,
        "password": user.password
    })
    .then((response) => {
        // console.log(response.data);
        // var isUserLoggedIn = response.data;

        if (response.data.loginSuccessful && response.data.isUserAdmin) {
            var users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8').toString());
            var userHtml = '';
            var emailString = '';

            users.forEach((user) => {
                delete user.password;
                userHtml += `
                    <li>
                        ${JSON.stringify(user, null, 2)}
                    </li>
                `;

                if (user.isSubscribed) {
                    emailString += ',' + user.email;
                }
            });

            var htmlResponse = `
                Välkommen till adminsidan!

                Användare: 
                <ul>
                    ${userHtml}
                </ul>

                Mejladresser: ${emailString}
            `;

            res.send(htmlResponse);
        }
        else {
            res.sendStatus(403);
        }
    })
});

module.exports = router;