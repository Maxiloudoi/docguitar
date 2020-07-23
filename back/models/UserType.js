const Sequelize = require("sequelize");
const express = require("express");

const sequelizeInstance = require("../sequilize");

const UserType = sequelizeInstance.define("UserType", {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    label: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
});

module.exports = UserType;
