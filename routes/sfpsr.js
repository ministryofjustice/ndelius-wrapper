const express = require('express');
const router = express.Router();
const {encrypt} = require('../helpers/encryption')
const request = require('request');
const moment = require('moment');

router.get('/', function(req, res, next) {
    if (req.query.offenderId) {
        const offenderId = req.query.offenderId
        const es_url = process.env.ELASTIC_SEARCH_URL || 'https://search-offender-amjj6s2g2jpanondipkd4nm57y.eu-west-2.es.amazonaws.com'

        request(es_url + '/offender/document/' + offenderId, function (err, response, body) {
            if (err) throw err;
            const document = JSON.parse(body)
            const offender = document._source
            let pnc = '';
            if (offender.otherIds.pncNumber) {
                pnc = encodeURIComponent(encrypt(`${offender.otherIds.pncNumber}`))
            }
            const crn = encodeURIComponent(encrypt(`${offender.otherIds.crn}`));
            let address = ''
            if (offender.contactDetails.addresses && offender.contactDetails.addresses.length > 0) {
                const offenderAddress = offender.contactDetails.addresses[0]
                let addressAsLine = ''
                if (offenderAddress.buildingName) {
                    addressAsLine = addressAsLine + offenderAddress.buildingName + '\r'
                }
                if (offenderAddress.addressNumber) {
                    addressAsLine = addressAsLine + offenderAddress.addressNumber + '\r'
                }
                if (offenderAddress.streetName) {
                    addressAsLine = addressAsLine + offenderAddress.streetName + '\r'
                }
                if (offenderAddress.town) {
                    addressAsLine = addressAsLine + offenderAddress.town + '\r'
                }
                if (offenderAddress.county) {
                    addressAsLine = addressAsLine + offenderAddress.county + '\r'
                }
                if (offenderAddress.postcode) {
                    addressAsLine = addressAsLine + offenderAddress.postcode + '\r'
                }
                address = encodeURIComponent(encrypt(addressAsLine))
            }
            const name = encodeURIComponent(encrypt(`${offender.firstName} ${offender.surname}`))
            const offenderDob = moment(offender.dateOfBirth, 'YYYY-MM-DD')
            const dateOfBirth = encodeURIComponent(encrypt(offenderDob.format('DD/MM/YYYY')))
            const age = encodeURIComponent(encrypt(`${Math.floor(moment().diff(offenderDob, 'years', true))}`))
            res.render('sfpsr', {baseUrl: process.env.NEW_TECH_BASE_URL, name, dateOfBirth, age, pnc, crn, address});
        });

    } else {
        const name = 'xylkFTVA6GXA1GRZZxZ4MA%3D%3D'
        const dateOfBirth = 'twqjuUftRY5xaB556mJb6A%3D%3D'
        const crn = 'v5LH8B7tJKI7fEc9uM76SQ%3D%3D'
        const age = 'RRioaTyIHLGnja2CBw8hqg%3D%3D'
        res.render('sfpsr', {baseUrl: process.env.NEW_TECH_BASE_URL, name, dateOfBirth, age, crn});
    }

});

module.exports = router;
