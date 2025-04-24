// const mongoose = require("mongoose");

// const AddressSchema = new mongoose.Schema(
//   {
//     userId: String,
//     address: String,
//     city: String,
//     pincode: String,
//     phone: String,
//     notes: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Address", AddressSchema);











// // models/Address.js

// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Address = sequelize.define("Address", {
//   id: {
//     type: DataTypes.STRING,
//     // autoIncrement: true,
//     primaryKey: true,
//   },
//   userId: {
//     type: DataTypes.STRING,  // Assuming userId is stored as STRING in your case
//     allowNull: false,
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   city: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   pincode: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   notes: {
//     type: DataTypes.STRING,
//     allowNull: true,  // Optional field
//   },
// }, {
//   tableName: "addresses",  // SQL table name
//   timestamps: true,        // createdAt and updatedAt automatic
// });

// module.exports = Address;










const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid'); // Import UUID generation
const sequelize = require("../config/db");

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,  // Optional field
  },
}, {
  tableName: "addresses",  // SQL table name
  timestamps: true,        // createdAt and updatedAt automatic
});

module.exports = Address;
