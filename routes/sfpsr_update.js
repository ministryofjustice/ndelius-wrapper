const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');


router.get('/', function(req, res, next) {
    MongoClient.connect(process.env.ANALYTICS_MONGO_CONNECTION || "mongodb://localhost", function(err, db) {
        if (err) throw err;
        const dbo = db.db("analytics");
        const query = {_id: ObjectId(req.query.id)}
        dbo.collection("shortFormatReports").findOne(query, (err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('sfpsr_update', { baseUrl: process.env.NEW_TECH_BASE_URL, document: result });
        });
    });



});

module.exports = router;
