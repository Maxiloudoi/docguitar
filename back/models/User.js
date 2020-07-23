const Sequelize = require("sequelize");
const express = require("express");
const bcrypt = require("bcrypt");

const sequelizeInstance = require("../sequilize");

const User = sequelizeInstance.define(
    "User",
    {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        lastName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        firstName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        phone: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                max: 14,
                min: 8,
            },
        },
        localisation: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        logo: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
    },
    {
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.passord, salt);
            },
            beforeCreate: (user) => {
                if (user.changed("password")) {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.get("password"), salt);
                }
            },
        },
    }
);

User.prototype.validPassword = function (password) {
    if (password === this.passwordp) {
        return true;
    } else {
        return false;
    }
};

module.exports = User;
