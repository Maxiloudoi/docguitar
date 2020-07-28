const Sequelize = require("sequelize");
const express = require("express");
const sequelizeInstance = require("../sequilize");

const Comment = sequelizeInstance.define("Reply", {
  comment: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Comment;
