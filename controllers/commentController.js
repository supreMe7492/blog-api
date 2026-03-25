const {insertComment} = require('../db/query');

async function postComment(req,res,next) {
    try{
    const postId = req.params.postId;
   const {name,comment} = req.body;
   await insertComment(name,comment,postId);
   res.json("posted comment successfully");
    }catch(err){
        next(err)
    }
}

module.exports = {postComment};