const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email,
            },
        });
        const isPasswordValid = user.validPassword(password);
        if (user && isPasswordValid) {
        } else {
        }
        res.status(422).json({
            message: "Wrong credentials",
        });
    } catch (err) {}
});
module.exports = router;
