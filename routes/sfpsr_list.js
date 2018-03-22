const express = require('express')
const router = express.Router()
const {MongoClient, ObjectID} = require('mongodb')
const moment = require('moment')

router.get('/', function(req, res, next) {
    MongoClient.connect(process.env.ANALYTICS_MONGO_CONNECTION || "mongodb://localhost", function(err, db) {
        if (err) throw err;
        var dbo = db.db(process.env.ANALYTICS_MONGO_DATABASE || "analytics");
        dbo.collection("shortFormatReports").find({}).sort({ _id: -1 }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('sfpsr_list', { documents: result.map(document => {return {
                    filename: document.filename,
                    onBehalfOfUser: document.onBehalfOfUser,
                    crn: document.crn,
                    _id: document._id,
                    timestamp: moment(ObjectID(document._id).getTimestamp()).format('DD/MM/YYYY')
                }}) });
        });
    });


});

module.exports = router;
