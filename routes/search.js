const express = require('express');
const router = express.Router();
const {encrypt} = require('../helpers/encryption')

router.get('/', function(req, res, next) {
    const epochMills = Date.now()
    const t = encodeURIComponent(encrypt(`${epochMills}`));
    const user = encodeURIComponent(encrypt('testUserNPS'));

    res.render('search', {baseUrl: process.env.NEW_TECH_BASE_URL, t: t, user: user});
});

module.exports = router;
