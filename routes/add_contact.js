const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('add_contact', {  });
});

module.exports = router;
