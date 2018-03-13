const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
    const offenderId = req.query.offenderId
    const es_url = process.env.ELASTIC_SEARCH_URL || 'https://search-offender-amjj6s2g2jpanondipkd4nm57y.eu-west-2.es.amazonaws.com'

    request(es_url + '/offender/document/' + offenderId, function (err, response, body) {
        if (err) throw err;
        const document = JSON.parse(body)
        res.render('offender_details', {offender: JSON.stringify(document._source, null, 4)  })
    });
});

module.exports = router;
