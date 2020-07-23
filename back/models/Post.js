const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequilize");

const Post = sequelizeInstance.define("Post", {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
});

module.exports = Post;
