const express = require("express");

const comments = express.Router();
const Comment = require("../models/Comment");
const authRole = require("../middlewares/authRole");
const User = require("../models/User");
const Post = require("../models/Post");

comments.get("/", async (req, res) => {
  try {
    const reply = await Comment.findAll();
    res.status(200).json(reply);
  } catch (err) {
    res.status(400).json(err);
  }
});

comments.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reply = await Comment.findOne({
      where: { id },
    });
    res.status(200).json(reply);
  } catch (err) {
    res.status(400).json(err);
  }
});

comments.post("/", async (req, res) => {
  const { comment, UserId, PostId } = req.body;
  try {
    const reply = await Comment.create({
      comment,
      UserId,
      PostId,
    });
    res.status(201).json(reply);
  } catch (err) {
    res.status(201).json(err);
  }
});

comments.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { comment, UserId, PostId } = req.body;
  try {
    const reply = await Comment.update({
      comment,
      UserId,
      PostId,
    });
    res.status(201).json(reply);
  } catch (err) {
    res.status(201).json(err);
  }
});

comments.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reply = await Comment.destroy({ where: { id } });
    res.status(200).json(reply);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = comments;
