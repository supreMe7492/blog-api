const {insertPost,selectuploadedPost,selectAuthorPost,updatePublishPost} = require('../db/query');
require('dotenv').config();
const jwt = require('jsonwebtoken');

async function getPosts(req,res){
    const posts = await selectuploadedPost();
    res.json(posts)
}

async function getAuthorPosts(req,res){
    const decoded = jwt.verify(req.token, process.env.secretkey);
    console.log(decoded);
    const authorId = decoded.id;
    const authorPost = await selectAuthorPost(authorId);
    res.json(authorPost);
}
async function createPosts(req,res) {
    const {title,content} = req.body;
        const decoded = jwt.verify(req.token, process.env.secretkey);
    console.log(decoded);
    const authorId = decoded.id;
    await insertPost(content,title,authorId);
    res.json('completed');
}

async function publishPost(req,res){
    const id = req.params.postId;
    await updatePublishPost(id);
    res.json("uploaded post");

}

module.exports = {getPosts,createPosts,publishPost,getAuthorPosts};