const {selectPost,insertPost} = require('../db/query');

async function getPosts(req,res){
    const posts = await selectPost();
    res.json(posts)
}

async function uploadPosts(req,res) {
    const {title,content,authorId} = req.body;
    await insertPost(title,content,authorId);
    res.json('completed');
}

module.exports = {getPosts,uploadPosts};