const crypto = require('crypto')

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

module.exports = {encrypt};
