/**
 * Created by @josleugim on 12/15/15.
 */
var auth = require('./auth'),
    users = require('../controllers/users'),
    posts = require('../controllers/posts'),
    rate = require('../controllers/rate'),
    multer = require('multer'),
    upload = multer({dest: 'public/thumbnails/'});

module.exports = function (app) {
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.get('/api/posts', posts.getPosts);
    app.put('/api/posts/rate', rate.put);
    //app.post('/api/posts', auth.requiresRole('admin'), upload.single('mediaUrl'), posts.createPost);
    //app.delete('/api/posts', auth.requiresRole('admin'), posts.deletePost);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('/admin/*', function (req, res) {
        res.render('admin', {
            bootstrappedUser: req.user
        });
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {
        // Bootstrapped the user
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};