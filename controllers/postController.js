const {insertPost,selectuploadedPost,selectAuthorBlog,updatePublishPost,updatePostContent,findPostAuthor,deletePost} = require('../db/query');
require('dotenv').config();

// function decodeUser(token){
//   const decoded = jwt.verify(token, process.env.secretkey);
//    return decoded.id;
// }
async function isAuthorPost(authorId,postId){
   const author = await findPostAuthor(postId);
   const postAuthorId = author.authorId;
   if(authorId == postAuthorId)
    return true;
return false;
}
async function getPosts(req,res){
    const posts = await selectuploadedPost();
    res.json(posts)
}

async function getAuthorPosts(req,res){
   
    const authorId = req.userId;
    const authorPost = await selectAuthorBlog(authorId);
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
    const isAuthor = await isAuthorPost(req.userId,id);
    if(req.userId){
       if(isAuthor){
         await updatePublishPost(id);
         return res.json("uploaded post");
       } else{
        return res.json("you aint the author bitch")
       }  
    
}

res.json("there aint no user");
}

async function editPost(req,res){
    const id = req.params.postId;
    const isAuthor = await isAuthorPost(req.userId,id);
    if(isAuthor){
       const title  = req.body.title;
       const content = req.body.content;
       await updatePostContent(id,title,content);
     return  res.json("changed properly");
    }

   res.json("not the author of this post") 
}

async function removePost(req,res){
    const id = req.params.postId;
    const isAuthor = await isAuthorPost(req.userId,id);
    if(isAuthor){
        await deletePost(id);
        return res.json("deleted post successfully");
    }
  res.json("you are not the author of this post so fuck off respectfully!");  
}

module.exports = {getPosts,createPosts,publishPost,getAuthorPosts,editPost,removePost};