const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('transfer_inactive_offender', {  offenderId: req.query.offenderId});
});

module.exports = router;
