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
async function getPosts(req,res,next){
    try{
        const posts = await selectuploadedPost();
        res.json(posts)
    }catch(err){
        next(err)
    }
}

async function getAuthorPosts(req,res,next){
    try{
        const authorId = req.userId;
        const authorPost = await selectAuthorBlog(authorId);
        res.json(authorPost);
    }catch(err){
        next(err)
    }
}
async function createPosts(req,res,next) {
    try{
        const {title,content} = req.body;
        const authorId = req.userId;
        const post = await insertPost(content,title,authorId);
        res.json({success:true,message:post});
    }catch(err){
        next(err)
    }
}

async function publishPost(req,res,next){
    try{
        const id = req.params.postId;
        const isAuthor = await isAuthorPost(req.userId,id);
        if(req.userId){
           if(isAuthor){
            const data = await updatePublishPost(id);
             return res.json({success:true,message:data});
           } else{
            return next({status:403,message:"you arenot the author of this post"})
           }  
        }
        next({status:401,message:"you are not logged in!"})
    }catch(err){
        next(err)
    }
}

async function editPost(req,res,next){
    try{
        const id = req.params.postId;
        const isAuthor = await isAuthorPost(req.userId,id);
       if(req.userId){
        if(isAuthor){
           const title  = req.body.title;
           const content = req.body.content;
           await updatePostContent(id,title,content);
         return  res.json({success:true,message:"changed properly"});
        }
        else {
         return next({status:403,message:"you are not the author of this post"})
        } 
        }
       
      return next({status:401,message:"not logged in"})
    }catch(err){
        next(err)
    }
}

async function removePost(req,res,next){
    try{
        const id = req.params.postId;
        const isAuthor = await isAuthorPost(req.userId,id);
        if(isAuthor){
            const data = await deletePost(id);
            return res.json({success:true,message:data});
        }
        return next({status:403,message:"you are not the author of this post"});
    }catch(err){
        next(err)
    }
}

module.exports = {getPosts,createPosts,publishPost,getAuthorPosts,editPost,removePost};