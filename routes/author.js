const {Router} = require("express");
const {verifyUser} = require("../controllers/userController");
const {getAuthorPosts,publishPost,createPosts,editPost,removePost} = require("../controllers/postController");

const author = Router();

author.get('/posts',verifyUser,getAuthorPosts);
author.post('/posts',verifyUser,createPosts);
author.patch('/posts/:postId',verifyUser,publishPost);
author.put('/posts/:postId',verifyUser,editPost);
author.delete('/posts/:postId',verifyUser,removePost);
module.exports = author;