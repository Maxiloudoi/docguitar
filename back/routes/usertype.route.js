const express = require("express");
const userTypes = express.Router();
const UserType = require("../models/UserType");
const authRole = require("../middlewares/authRole");


userTypes.get("/", authRole(["ADMIN", "USER"]), async (req, res) => {
  try {
    const userType = await UserType.findAll();
    res.status(200).json(userType);
  } catch (err) {
    res.status(400).json(err);
  }
});

userTypes.get("/:id", authRole(["ADMIN", "USER"]),async (req, res) => {
  const { id } = req.params;
  try {
    const userType = await UserType.findOne({ where: { id } });
    res.status(200).json(userType);
  } catch (err) {
    res.status(400).json(err);
  }
});

userTypes.post("/", async (req, res) => {
  const { label } = req.body;
  try {
    const type = await UserType.create({ label });
    res.status(201).json(type);
  } catch (err) {
    res.status(400).json(err);
  }
});

userTypes.put("/:id", authRole("ADMIN"),async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;
  try {
      const type = await UserType.update({ label }, { where: { id } });
      res.status(202).send("type d'utilisateur modifié");
  } catch (err) {
      res.status(422).json(err);
  }
});

userTypes.delete("/:id", authRole("ADMIN"),async (req, res) => {
  const { id } = req.params;
  try {
    const userType = await UserType.destroy({ where: { id } });
    res.status(205).send("Type d'utilisateur supprimé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = userTypes;
