const express = require("express");
const activityFields = express.Router();
const Field = require("../models/ActivityFiedls");

activityFields.get("/", async (req, res) => {
    try {
        const field = await Field.findAll();
        res.status(200).json(field);
    } catch (err) {
        res.status(400).json(err);
    }
});

activityFields.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const field = await Field.findAll({ where: { id } });
        res.status(200).json(field);
    } catch (err) {
        res.status(400).json(err);
    }
});

activityFields.post("/", async (req, res) => {
    const { instrument } = req.body;
    try {
        const field = await Field.create({ instrument });
        res.status(201).json(field);
    } catch (err) {
        res.status(400).json(err);
    }
});

activityFields.put("/:id", async (req, res) => {
    const { instrument } = req.body;
    const { id } = req.params;
    try {
        const field = await Field.findAll({ instrument }, { where: { id } });
        res.status(202).send("secteur d'activité modifié");
    } catch (err) {
        res.status(422).json(err);
    }
});

activityFields.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const field = await Field.destroy({ where: { id } });
        res.status(205).send("Le secteur d'activité à bien été supprimé");
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = activityFields;
