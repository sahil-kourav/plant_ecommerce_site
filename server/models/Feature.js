// const mongoose = require("mongoose");

// const FeatureSchema = new mongoose.Schema(
//   {
//     image: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Feature", FeatureSchema);











// models/Feature.js

// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Feature = sequelize.define("Feature", {
//   id: {
//     type: DataTypes.STRING,
//     // autoIncrement: true,
//     primaryKey: true,
//   },
//   image: {
//     type: DataTypes.STRING,
//     allowNull: true, // Image field optional
//   },
// }, {
//   tableName: "features", // SQL table name
//   timestamps: true,      // createdAt and updatedAt automatic
// });

// module.exports = Feature;










// models/Feature.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Feature = sequelize.define("Feature", {
  id: {
    type: DataTypes.UUID,
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
  allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // Image field optional
  },
}, {
  tableName: "features", // SQL table name
  timestamps: true,      // createdAt and updatedAt automatic
});

module.exports = Feature;
