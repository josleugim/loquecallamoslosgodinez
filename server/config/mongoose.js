/**
 * Created by @josleugim on 12/15/15.
 */
var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    feedModel = require('../models/Post');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Db opened');
    });

    userModel.createDefaultUsers();
    //feedModel.createDefaultFeeds();
};