const user = require("./models/User");
const type = require("./models/UserType");
const activity = require("./models/ActivityFiedls");
const post = require("./models/Post");
const comment = require("./models/Comment");

user.hasOne(type, { foreignKey: { allowNull: false } });
type.hasMany(user, { foreignKey: { allowNull: true } });

user.hasOne(activity, { foreignKey: { allowNull: false } });
activity.hasMany(user, { foreignKey: { allowNull: true } });

user.hasMany(post, { foreignKey: { allowNull: false } });
post.belongTo(user, { foreignKey: { allowNull: false } });

user.belongsToMany(post, { through: comment });
post.belongsToMany(user, { through: comment });
