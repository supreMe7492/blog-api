const {getPosts} = require('../controllers/postController');
const {postComment} = require("../controllers/commentController")
const {Router} = require('express');
const dashboard = Router();
dashboard.get('/',getPosts);
dashboard.post('/comments/:postId',postComment);
module.exports = dashboard;