const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('pdf', { id: req.query.id });
});

module.exports = router;
