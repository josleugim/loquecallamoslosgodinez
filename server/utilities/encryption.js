/**
 * Created by @josleugim on 12/15/15.
 */
var crypto = require('crypto');

// Passport generates the salt
exports.createSalt =  function() {
    return crypto.randomBytes(128).toString('base64');
};

// Generates the hash password, receives the salt and the password
exports.hashPwd = function(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
};