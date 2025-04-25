const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Feature = sequelize.define("Feature", {
  id: {
    type: DataTypes.UUID,
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4, 
  allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  tableName: "features", 
  timestamps: true,      
});

module.exports = Feature;
