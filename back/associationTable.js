const user = require("./models/User");
const type = require("./models/UserType");
const activity = require("./models/ActivityFiedls");
const post = require("./models/Post");
const comment = require("./models/Comment");

user.belongsTo(type, { foreignKey: { allowNull: true } });
type.hasMany(user, { foreignKey: { allowNull: true } });

user.belongsTo(activity, { foreignKey: { allowNull: true } });
activity.hasMany(user, { foreignKey: { allowNull: true } });

user.hasMany(post, { foreignKey: { allowNull: false } });
post.belongsTo(user, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });

user.belongsToMany(post, { through: comment });
post.belongsToMany(user, { through: comment });
