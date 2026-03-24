const {Router} = require("express");
const {verifyUser} = require("../controllers/userController");
const {getAuthorPosts,publishPost,createPosts,editPost,removePost} = require("../controllers/postController");

const author = Router();

author.get('/',verifyUser,getAuthorPosts);
author.post('/',verifyUser,createPosts);
author.put('/post/publish/:postId',verifyUser,publishPost);
author.put('/post/edit/:postId',verifyUser,editPost);
author.put('/post/delete/:postId',verifyUser,removePost);
module.exports = author;