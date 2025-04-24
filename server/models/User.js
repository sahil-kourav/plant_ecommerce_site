// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   userName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   number: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user",
//   },
// });

// const User = mongoose.model("User", UserSchema);
// module.exports = User;























// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db"); // Tera DB connection file

// const User = sequelize.define("User", {
//   id: {
//     type: DataTypes.STRING,
//     // autoIncrement: true,
//     primaryKey: true,
//   },
//   userName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     trim: true,
//   },
//   number: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.ENUM("user", "admin"),
//     defaultValue: "user",
//   },
// }, {
//   tableName: "users",       
//   timestamps: true,         
// });

// module.exports = User;







const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Tera DB connection file

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    // `trim` is not a Sequelize option; trimming should be handled manually or via hooks/middleware
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
}, {
  tableName: "users",
  timestamps: true,
});

module.exports = User;
