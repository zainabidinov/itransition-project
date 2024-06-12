const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
