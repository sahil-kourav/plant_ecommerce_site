// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     image: String,
//     title: String,
//     description: String,
//     category: String,
//     price: Number,
//     salePrice: Number,
//     totalStock: Number,
//     averageReview: Number,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", ProductSchema);













// models/Product.js

// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Product = sequelize.define("Product", {
//   id: {
//     type: DataTypes.STRING,
//     // autoIncrement: true,
//     primaryKey: true,
//   },
//   image: {
//     type: DataTypes.STRING,
//     allowNull: true,  // Image optional hai
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: true,  // Description optional hai
//   },
//   category: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   salePrice: {
//     type: DataTypes.FLOAT,
//     allowNull: true,  // SalePrice optional
//   },
//   totalStock: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   averageReview: {
//     type: DataTypes.FLOAT,
//     allowNull: true,  // Average review optional
//   },
// }, {
//   tableName: "products", // SQL table name
//   timestamps: true,      // createdAt and updatedAt automatic
// });

// module.exports = Product;








// models/Product.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,  // Image optional hai
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,  // Description optional hai
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  salePrice: {
    type: DataTypes.FLOAT,
    allowNull: true,  // SalePrice optional
  },
  totalStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  averageReview: {
    type: DataTypes.FLOAT,
    allowNull: true,  // Average review optional
  },
}, {
  tableName: "products", // SQL table name
  timestamps: true,      // createdAt and updatedAt automatic
});

module.exports = Product;
