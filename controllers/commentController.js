const {insertComment} = require('../db/query');

async function postComment(req,res,next) {
    try{
    const postId = req.params.postId;
   const {name,comment} = req.body;
   const data = await insertComment(name,comment,postId);
   res.json({success:true,message:data});
    }catch(err){
        next(err)
    }
}

module.exports = {postComment};