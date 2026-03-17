const {Router} = require("express");
const {verifyUser} = require("../controllers/userController");
const {getAuthorPosts,publishPost,createPosts} = require("../controllers/postController");

const author = Router();

author.get('/',verifyUser,getAuthorPosts);
author.post('/',verifyUser,createPosts);
author.put('/post/publish/:postId',publishPost);

module.exports = author