/**
 * Created by @josleugim on 12/16/15.
 */
var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    console.log('GET users');
    User.find({}).exec(function (err, collection) {
        res.send(collection.toJSON);
    })
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);

    User.create(userData, function (err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('El nombre del usuario ya existe!')
            }

            res.status(400);

            return res.send({reason:err.toString()})
        }
        res.send(user);
    });
};