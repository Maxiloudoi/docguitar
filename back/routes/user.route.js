const express = require("express");
const users = express.Router();
const User = require("../models/User");

const authRole = require("../middlewares/authRole");

users.get("/", authRole("ADMIN"), async (req, res) => {
  try {
      if(req.user) {
        console.log('youhou');
    const user = await User.findAll();
    res.status(200).json(user);
      } else {
        throw new Error("You are not admin!");
      }
  } catch (err) {
    res.status(400).json(err);
  }
});

users.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

users.post("/", async (req, res) => {
  const {
    lastName,
    firstName,
    phone,
    email,
    password,
    localisation,
    role,
    logo,
  } = req.body;
  try {
    const user = await User.create({
      lastName,
      firstName,
      phone,
      email,
      password,
      localisation,
      role,
      logo,
    });
    delete user.dataValues.password;
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    lastName,
    firstName,
    phone,
    email,
    password,
    localisation,
    role,
    logo,
  } = req.body;
  try {
    const user = await User.update(
      {
        lastName,
        firstName,
        phone,
        email,
        password,
        localisation,
        role,
        logo,
      },
      { where: { id } }
    );
    res.status(202).send("utilisateur mdofié");
  } catch (err) {
    res.status(422).json(err);
  }
});

users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { id } });
    res.status(205).send("L'utilisateur à bien été supprimé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = users;
