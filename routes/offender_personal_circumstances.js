const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('offender_personal_circumstances', {  offenderId: req.query.offenderId});
});

module.exports = router;
