/**
 * Created by @josleugim on 12/15/15.
 */
var Twitter = require('twitter'),// Get Twitter feed, more info at: https://github.com/desmondmorris/node-twitter
    Feed = require('mongoose').model('Post');

module.exports = function (config) {
    var client = new Twitter({
        "consumer_key": config.TWITTER_CONSUMER_KEY,
        "consumer_secret": config.TWITTER_CONSUMER_SECRET,
        "access_token_key": config.TWITTER_ACCESS_TOKEN_KEY,
        "access_token_secret": config.TWITTER_ACCESS_TOKEN_SECRET
    });

    var query = {socialNetwork: 'Twitter'};
    Feed.findOne(query,{}, {sort: {_id:-1}}, function (err, feed) {
        if(err) console.log(err);

        requestFeed(client, feed);
    });
};

function requestFeed(client, feed) {
    var returnFeed = [],
        reversedFeed = [];
    // Looking for the last hashtagid
    var sinceId = feed ? feed.hashTagId : '';
    console.log('Twitter API using since_id= ' + sinceId);
    client.get('search/tweets',
        {
            q: '#loquecallamoslosgodinez',
            result_type: 'recent',
            f: 'images',
            since_id: sinceId
        },
        function(error, tweets) {
            // Validates if the feed has records
            console.log('First request, tweets length: ' + tweets.statuses.length);
            if(tweets.statuses.length > 0) {
                if(error) console.log(error);

                tweets.statuses.forEach(function (item) {
                    var media = {socialNetwork: 'Twitter'};
                    if(item.retweeted_status == undefined){
                        if(item.entities.media) {
                            media.hashTagId = String(item.id);
                            media.caption = item.text;
                            media.username = item.user.name;
                            for(var i in item.entities.media){
                                media.mediaUrl = item.entities.media[i].media_url;
                                media.displayUrl = item.entities.media[i].url;
                                returnFeed.push(media);
                            }
                        }
                    }
                    // It's fulfilled when the db has no records
                    if(!feed)
                        insertFeed(media);
                });
                if(feed) {
                    if (tweets.statuses[0].id != feed.hashTagId) {
                        console.log('Api id: ' + tweets.statuses[0].id);
                        console.log('Db hashtagid: ' + feed.hashTagId);
                        // Creating the object of the last Instagram feeds
                        var skip = 0;
                        reversedFeed = returnFeed.reverse();
                        for(var i in reversedFeed){
                            if(feed.hashTagId == reversedFeed[i].hashTagId) {
                                skip = i;
                            }
                        }
                        console.log('Skip: ' + skip);

                        for(var i in reversedFeed){
                            console.log(parseInt(i));
                            if(parseInt(i) >= parseInt(skip)){
                                var post = {
                                    socialNetwork: "Twitter",
                                    username: reversedFeed[i].username,
                                    caption: reversedFeed[i].caption,
                                    hashTagId: reversedFeed[i].hashTagId,
                                    mediaUrl: reversedFeed[i].mediaUrl,
                                    displayUrl: reversedFeed[i].displayUrl
                                };
                                console.log(post);
                                insertFeed(post);
                            }
                        }
                    }
                } else console.log('Twitter feed up to date');
            } else console.log('Twitter feed up to date');
        });
}

function insertFeed(newMedia) {
    // Saving to the db
    console.log('Saving twitter feed to the db, hashtagid: ' + newMedia.hashTagId);
    var feed = new Feed(newMedia);
    feed.save();
}