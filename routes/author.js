const {Router} = require("express");
const {verifyUser} = require("../controllers/userController");
const {getAuthorPosts,publishPost,createPosts,editPost} = require("../controllers/postController");

const author = Router();

author.get('/',verifyUser,getAuthorPosts);
author.post('/',verifyUser,createPosts);
author.put('/post/publish/:postId',verifyUser,publishPost);
author.put('/post/edit/:postId',verifyUser,editPost);
module.exports = author;