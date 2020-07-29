const express = require("express");
const activityFields = express.Router();
const Field = require("../models/ActivityFiedls");
const authRole = require("../middlewares/authRole")

activityFields.get("/",authRole(["ADMIN", "USER"]), async (req, res) => {
    try {
        const field = await Field.findAll();
        res.status(200).json(field);
    } catch (err) {
        res.status(400).json(err);
    }
});

activityFields.get("/:id",authRole(["ADMIN", "USER"]), async (req, res) => {
    const { id } = req.params;
    try {
        const field = await Field.findAll({ where: { id } });
        res.status(200).json(field);
    } catch (err) {
        res.status(400).json(err);
    }
});

activityFields.post("/", async (req, res) => {
    const { domaine } = req.body;
    try {
        const field = await Field.create({ domaine });
        res.status(201).json(field);
    } catch (err) {
        res.status(400).json(err);
    }
});

activityFields.put("/:id",authRole("ADMIN"), async (req, res) => {
    const { domaine } = req.body;
    const { id } = req.params;
    try {
        const field = await Field.findAll({ domaine }, { where: { id } });
        res.status(202).send("secteur d'activité modifié");
    } catch (err) {
        res.status(422).json(err);
    }
});

activityFields.delete("/:id",authRole("ADMIN"), async (req, res) => {
    const { id } = req.params;
    try {
        const field = await Field.destroy({ where: { id } });
        res.status(205).send("Le secteur d'activité à bien été supprimé");
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = activityFields;
