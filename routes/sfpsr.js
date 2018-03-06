var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('sfpsr', {baseUrl: process.env.NEW_TECH_BASE_URL});
});

module.exports = router;
