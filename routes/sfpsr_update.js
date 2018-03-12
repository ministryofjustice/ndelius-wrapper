const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const crypto = require('crypto')

router.get('/', function(req, res, next) {
    MongoClient.connect(process.env.ANALYTICS_MONGO_CONNECTION || "mongodb://localhost", function(err, db) {
        if (err) throw err;
        const dbo = db.db("analytics");
        const query = {_id: ObjectId(req.query.id)}
        dbo.collection("shortFormatReports").findOne(query, (err, result) => {
            if (err) throw err;
            db.close();
            res.render('sfpsr_update', { baseUrl: process.env.NEW_TECH_BASE_URL, documentId: encodeURIComponent(encrypt(result._id.toHexString())) });
        });
    });



});


const encrypt = (text) => {
    const hash = crypto.createHash("sha1");
    hash.update(process.env.PARAMS_SECRET_KEY || 'ThisIsASecretKey', "utf8");
    const keyDigest = hash.digest();
    const keyBuffer = new Buffer(keyDigest, 'base64');
    const cipher = crypto.createCipheriv('AES-128-ECB', keyBuffer.slice(0, 16),  new Buffer(0));
    cipher.setAutoPadding(true)

    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

module.exports = router;
