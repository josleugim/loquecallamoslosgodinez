/**
 * Created by @josleugim on 12/16/15.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    username: {type: String},
    hashTagId: {
        type: String,
        required: '{PATH} hashtag id requerido',
        unique: true
    },
    socialNetwork: {type: String},
    mediaUrl: {type: String},
    displayURl: {type: String},
    caption: {type: String},
    rate: {type: Number},
    isActive: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
});

var Post = mongoose.model('Post', postSchema);

function seedPosts() {
    Post.find({}).exec(function (err, collection) {
        if(collection.length === 0) {
            Post.create({
                hashTagId: '1137033960601655888_864033557',
                socialNetwork: 'Instagram',
                mediaUrl: 'https://scontent.cdninstagram.com/hphotos-xtp1/t51.2885-15/e35/12362086_207263719607305_1726034988_n.jpg',
                displayUrl: 'https://www.instagram.com/p/_HjlznN5pQ/'
            })
        }
    })
}

exports.seedPosts = seedPosts;