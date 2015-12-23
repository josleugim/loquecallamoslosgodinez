/**
 * Created by @josleugim on 12/15/15.
 */
var express = require('express'),
    cronJob = require('cron').CronJob;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

var job = new cronJob({
    cronTime: '0 */1 * * * *',
    onTick: function(){
        console.log('Cron job executed');
        require('./server/utilities/instagram')(config);
        require('./server/utilities/twitter')(config);
    },
    start: true,
    timeZone: 'America/Los_Angeles'
});

require('./server/config/passport')();

require('./server/config/routes')(app);

// port listening setup
app.listen(config.port, function () {
    console.log('Gulp is running my app on PORT: ' + config.port);
})