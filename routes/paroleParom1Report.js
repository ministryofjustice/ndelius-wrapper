const express = require('express');
const router = express.Router();
const {encrypt} = require('../helpers/encryption')
const request = require('request');

router.get('/', function(req, res, next) {
    const epochMills = Date.now()
    const t = encodeURIComponent(encrypt(`${epochMills}`));
    const user = encodeURIComponent(encrypt('testUserNPS'));
    const onBehalfOfUser = encodeURIComponent(encrypt('Test User'));
    const entityId = encodeURIComponent(encrypt('7654321'));

    if (req.query.offenderId) {
        const offenderId = req.query.offenderId
        const es_url = process.env.ELASTIC_SEARCH_URL || 'https://search-offender-amjj6s2g2jpanondipkd4nm57y.eu-west-2.es.amazonaws.com'

        request(es_url + '/offender/document/' + offenderId, function (err, response, body) {
            if (err) throw err;
            const document = JSON.parse(body)
            const offender = document._source
            const crn = encodeURIComponent(encrypt(`${offender.otherIds.crn}`));
            res.render('paroleParom1Report', {baseUrl: process.env.NEW_TECH_BASE_URL, crn, t, user, onBehalfOfUser, entityId});
        });

    } else {
            const crn = req.query.gender === 'female' ? encodeURIComponent(encrypt('X54321')) : encodeURIComponent(encrypt('fakecrn'));
            res.render('paroleParom1Report', {baseUrl: process.env.NEW_TECH_BASE_URL, crn, t, user, onBehalfOfUser, entityId});
    }

});

module.exports = router;
