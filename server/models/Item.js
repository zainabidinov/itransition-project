const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Item = sequelize.define("item", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  itemTag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  collectionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "collections",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

module.exports = Item;
