const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;


router.get('/', function(req, res, next) {
    MongoClient.connect(process.env.ANALYTICS_MONGO_CONNECTION || "mongodb://localhost", function(err, db) {
        if (err) throw err;
        var dbo = db.db("analytics");
        dbo.collection("shortFormatReports").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('sfpsr_list', { documents: result });
        });
    });


});

module.exports = router;
