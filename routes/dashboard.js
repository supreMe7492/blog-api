const { getPosts, getPost } = require("../controllers/postController");
const { postComment } = require("../controllers/commentController");
const { Router } = require("express");
const dashboard = Router();
dashboard.get("/", getPosts);
dashboard.get("/:postId", getPost);
dashboard.post("/:postId/comments", postComment);
module.exports = dashboard;
