const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
    const appUrl = process.env.NEW_TECH_BASE_URL;
    request(appUrl + 'healthcheck', function (err, response, body) {
        if (err) throw err;
        const document = JSON.parse(body);
        res.render('healthcheck', {healthcheck: JSON.stringify(document, null, 4)  })
    });
});

module.exports = router;
