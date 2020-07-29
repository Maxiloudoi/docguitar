const Sequelize = require("sequelize");
const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
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
        username: {
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
        role: {
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
                const salt = bcrypt.genSaltSync(saltRounds);
                user.password = bcrypt.hashSync(user.password, salt);
            },
            beforeUpdate: (user) => {
                if (user.changed("password")) {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.get("password"), salt);
                }
            },
        },
    }
);

User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;
