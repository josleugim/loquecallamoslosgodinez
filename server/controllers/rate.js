/**
 * Created by @josleugim on 1/5/16.
 */
var Post = require('mongoose').model('Post');

exports.put = function (req, res, next) {
    console.log('Rating post');
    // for security reasons we construct the query and the data with the parameters we expect
    var query = {_id: req.body._id};
    Post.update(query, {$inc: {"rate": 1}}, function (err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({success: false, error: err});
        } else {
            console.log(result);
            res.status(201).json({success: true});
            res.end();
        }
    })
}
