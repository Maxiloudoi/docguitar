const express = require("express");
const posts = express.Router();
const Post = require("../models/Post");
const authRole = require("../middlewares/authRole");
const Comment = require("../models/Comment");
const User = require("../models/User");

posts.use(authRole(["ADMIN", "USER"]));

posts.get("/", async (req, res) => {
  try {
    const post = await Post.findAll();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

posts.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne(
      {
        include: [
          {
            model: Comment,
          },
          {
            model: User,
          }
        ],
      },
      { where: { id } }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

posts.post("/", async (req, res) => {
  const { title, content, UserId } = req.body;
  try {
    const post = await Post.create({
      title,
      content,
      UserId,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

posts.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content , UserId} = req.body;
  try {
    const post = await Post.update({ title, content , UserId}, { where: { id } });
    res.status(202).send("poste modifié");
  } catch (err) {
    res.status(422).json(err);
  }
});

posts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.destroy({ where: { id } });
    res.status(205).send("Le poste à bien été supprimé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = posts;
