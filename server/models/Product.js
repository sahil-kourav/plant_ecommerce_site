const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: true, 
  },
  totalStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  averageReview: {
    type: DataTypes.FLOAT,
    allowNull: true, 
  },
}, {
  tableName: "products",
  timestamps: true,     
});

module.exports = Product;
