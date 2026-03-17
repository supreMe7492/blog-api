const {getPosts} = require('../controllers/postController');
const {Router} = require('express');
const dashboard = Router();
dashboard.get('/',getPosts);
module.exports = dashboard;