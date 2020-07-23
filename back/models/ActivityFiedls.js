const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequilize");

const ActiviyField = sequelizeInstance.define("ActivityField", {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    instrument: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
});

module.exports = ActiviyField;
