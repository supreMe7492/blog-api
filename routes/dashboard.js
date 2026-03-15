const {getPosts,uploadPosts} = require('../controllers/postController');
const {Router} = require('express');
const dashboard = Router();
dashboard.get('/',getPosts);
dashboard.post('/',uploadPosts);
module.exports = dashboard;