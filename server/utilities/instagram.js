/**
 * Created by @josleugim on 12/15/15.
 */
var request = require('request'),
    Feed = require('mongoose').model('Post');

module.exports = function (config) {
    var url = "https://api.instagram.com/v1/tags/" + config.hashtag + "/media/recent?access_token="
        + config.instagram_access_token;
    var query = {socialNetwork: 'Instagram'};
    Feed.findOne(query,{}, {sort: {_id:-1}}, function (err, feed) {
        if(err) console.log(err);

        requestFeed(url, feed);
    });
};

function requestFeed(url, feed) {
    var returnFeed = [];
    var reversedFeed = [];
    request(url, function (error, response, body) {
        console.log('Searching for the hashtagid in the db');
        if(body) {
            var data = JSON.parse(body);
            if(data.data.length > 0) {
                for(var i in data.data){
                    var media = {
                        socialNetwork: "Instagram"
                    };
                    media.username = data.data[i].user.full_name;
                    media.caption = data.data[i].caption.text;
                    media.hashTagId = data.data[i].id;
                    media.mediaUrl = data.data[i].images.thumbnail.url;
                    media.displayUrl = data.data[i].link;

                    returnFeed.push(media);
                    // It's fulfilled when the db has no records
                    if(!feed)
                        insertFeed(media);
                }
                if(feed) {
                    if(data.data[0].id != feed.hashTagId) {
                        // Creating the object of the last Instagram feeds
                        var skip = 0;
                        reversedFeed = returnFeed.reverse();
                        for(var i in reversedFeed){
                            if(feed.hashTagId == reversedFeed[i].hashTagId) {
                                skip = i;
                            }
                        }
                        for(var i in reversedFeed){
                            if(parseInt(i) > parseInt(skip)){
                                var post = {
                                    socialNetwork: "Instagram",
                                    username: reversedFeed[i].username,
                                    caption: reversedFeed[i].caption,
                                    hashTagId: reversedFeed[i].hashTagId,
                                    mediaUrl: reversedFeed[i].mediaUrl,
                                    displayUrl: reversedFeed[i].displayUrl
                                };
                                insertFeed(post);
                            }
                        }
                    } else console.log('Instagram feed up to date');
                }
            }
        }
    });
}

function insertFeed(newMedia) {
    // Saving to the db
    console.log('Saving to the db, hashtagid: ' + newMedia.hashTagId);
    var feed = new Feed(newMedia);
    feed.save();
}