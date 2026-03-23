const {insertPost,selectuploadedPost,selectAuthorPost,updatePublishPost,updatePostContent} = require('../db/query');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// function decodeUser(token){
//   const decoded = jwt.verify(token, process.env.secretkey);
//    return decoded.id;
// }
async function getPosts(req,res){
    const posts = await selectuploadedPost();
    res.json(posts)
}

async function getAuthorPosts(req,res){
   
    const authorId = req.userId;
    const authorPost = await selectAuthorPost(authorId);
    res.json(authorPost);
}
async function createPosts(req,res) {
    const {title,content} = req.body;
    const authorId = req.userId;
    await insertPost(content,title,authorId);
    res.json('completed');
}

async function publishPost(req,res){
    const id = req.params.postId;
    await updatePublishPost(id);
    res.json("uploaded post");

}

async function editPost(req,res){
    const id = req.params.postId;
    const authorId = req.userId;
}

module.exports = {getPosts,createPosts,publishPost,getAuthorPosts};