/**
 * Created by @josleugim on 12/15/15.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/loquecallamoslosgodinez-dev',
        rootPath: rootPath,
        port: process.env.PORT || 5000,
        TWITTER_CONSUMER_KEY : "Wf0GxqCLgWSLac3PqLklxQ",
        TWITTER_CONSUMER_SECRET : "RTLRJap0VtxvQixnRQ9CeUpuLpIgETKeKaDEZ00",
        TWITTER_ACCESS_TOKEN_KEY : "14859300-805TxLpsk05cqUARdzwCLCG6zcSyIv7kZ5reePqJV",
        TWITTER_ACCESS_TOKEN_SECRET : "UmtKIl1v2Gik9a3F1pmR9shwYSwoyInSVizTq4uaHuvuG",
        instagram_access_token: "48981053.cba8782.18e0e04efe2748ccbce397902730173c",
        hashtag: 'loquecallamoslosgodinez'
    },
    production: {
        db: 'mongodb://localhost/loquecallamoslosgodinez',
        rootPath: rootPath,
        port: process.env.PORT || 5000
    }
};