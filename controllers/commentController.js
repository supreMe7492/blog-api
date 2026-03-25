const {insertComment} = require('../db/query');

async function postComment(req,res) {
    const postId = req.params.postId;
   const {name,comment} = req.body;
   await insertComment(name,comment,postId);
   res.json("posted comment successfully");
}

module.exports = {postComment};