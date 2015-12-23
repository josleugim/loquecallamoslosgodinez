/**
 * Created by @josleugim on 12/15/15.
 */
var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    // the username is used to authenticate, its unique in the db
    username: {
        type: String,
        required:'{PATH} nombre de usuario requerido',
        unique: true
    },
    // the salt conforms the hashed_pwd
    salt: {type: String, required:'{PATH} requerido'},
    hashed_pwd: {type: String, required:'{PATH} requerido'},
    roles: [{type: String}],
    isActive: {type: Boolean},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}
});

// Custom Methods
userSchema.methods = {
    // Validates the hash password
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    // For security reasons lets remove the password, roles, _id, isActive from the object
    toJSON: function () {
        var user = this.toObject();
        delete user.hashed_pwd;
        delete user.salt;
        delete user.createdAt;
        delete user.isActive;
        delete user._id;
        return user;
    }
};

// Seeds the authentications collection if it has no data
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {

        if(collection.length === 0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'demo');
            User.create({username: 'admin', salt: salt, hashed_pwd: hash, roles: ["admin"], isActive: true});
        }
    });
};

exports.createDefaultUsers = createDefaultUsers;