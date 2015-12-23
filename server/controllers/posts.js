/**
 * Created by @josleugim on 12/16/15.
 */
var Post = require('mongoose').model('Post');
var collectionRows = 0;

exports.getFeeds = function (req, res) {
    console.log('GET posts');
    var pageSize = 12;
    var start = 0;
    console.log('Current page: ' + req.query.currentPage);
    var currentPage = parseInt(req.query.currentPage);
    Post.count({}, function (err, collection) {
        collectionRows = collection;
    });
    var query = {};
    if (!req.query.admin) {
        var totalPages = Math.ceil(parseInt(collectionRows) / pageSize);
        if (parseInt(totalPages) >= parseInt(currentPage)) {
            start = (currentPage - 1) * pageSize;

            Post.find(query)
                .sort({_id: -1})
                .limit(pageSize)
                .skip(start)
                .exec(function (err, collection) {
                    // Serve a correct url for the thumbnail images
                    for (var i in collection) {
                        if (collection[i].socialNetwork == "Custom")
                            collection[i].mediaUrl = 'http://' + req.headers.host + "/thumbnails/" + collection[i].mediaUrl;
                    }
                    res.status(200).send(collection);
                    res.end();
                })
        } else {
            res.status(400).json({success: false, error: 'No more feed'});
            res.end();
        }
    } else {
        console.log('admin: ' + req.query.admin);
        Post.find(query)
            .sort({_id: -1})
            .exec(function (err, collection) {
                // Serve a correct url for the thumbnail images
                for (var i in collection) {
                    if (collection[i].socialNetwork == "Custom")
                        collection[i].mediaUrl = 'http://' + req.headers.host + "/thumbnails/" + collection[i].mediaUrl;
                }
                res.status(200).send(collection);
                res.end();
            })
    }
};

exports.createFeed = function (req, res, next) {
    console.log('POST method')
    var post = new Post(req.body);
    post.socialNetwork = "Custom";
    post.hashTagId = post._id;
    post.mediaUrl = req.file.filename;

    post.save();
    res.status(201).json({success: true});
    res.end();
};

exports.deleteFeed = function (req, res, next) {
    console.log(req.body);
    var query = {_id: req.body._id};
    var data = {isActive: false};
    Post.update(query, {$set: data}, function (err, result) {
        if(err) {
            console.log(err);
            res.status(401).json({success: false, error: err});
        } else {
            res.status(201).json({success: true});
            res.end();
        }
    });
};