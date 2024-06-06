const User = require("./User");
const Collection = require("./Collection");
const Item = require("./Item");

User.hasMany(Collection, { foreignKey: "userId", onDelete: "CASCADE" });
Collection.belongsTo(User, { foreignKey: "userId" });

Collection.hasMany(Item, { foreignKey: "collectionId", onDelete: "CASCADE" });
Item.belongsTo(Collection, { foreignKey: "collectionId" });

User.hasMany(Item, { foreignKey: "userId", onDelete: "CASCADE" });
Item.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Collection, Item };
