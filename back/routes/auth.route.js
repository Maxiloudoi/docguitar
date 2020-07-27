const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const router = express.Router();

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({
            where: {
                email
            },
        });
        
        const passwordValid = user.validPassword(password)
        
        if (user && passwordValid) {
            const token = jwt.sign({
                email,
                role: user.dataValues.role
            },
            secret,
            {
                expiresIn:"24h"
            })
            delete user.dataValues.password
            res.status(200).json({
                token,
                user
            })
        } else {
            res.status(422).json({
                message: "Wrong Credential"
            })
            
    } 
    }catch (error) {
        res.status(422).json({
            message: "Wrong Credentials"
        })
    }
})

module.exports = router;
