const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductReview = sequelize.define('ProductReview', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  averageReview: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  reviewMessage: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  reviewValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5, 
    },
  },
}, {
  tableName: 'product_reviews',
  timestamps: true,
});

module.exports = ProductReview;
