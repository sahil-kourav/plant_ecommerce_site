// models/Review.js
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/db'); // Assuming you're using Sequelize with MySQL

// const ProductReview = sequelize.define('ProductReview', {
//   productId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   userId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   userName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   averageReview: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   reviewMessage: {
//     type: DataTypes.STRING,
//     allowNull: true, // Optional review message
//   },
//   reviewValue: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     validate: {
//       min: 1,
//       max: 5, // Rating scale between 1 and 5
//     },
//   },
// }, {
//   tableName: 'product_reviews',  // Explicitly define the table name
//   timestamps: true, // Sequelize automatically adds createdAt and updatedAt timestamps
// });

// module.exports = ProductReview;










const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductReview = sequelize.define('ProductReview', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
    allowNull: false,
  },
  productId: {
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
    allowNull: true, // Optional review message
  },
  reviewValue: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5, // Rating scale between 1 and 5
    },
  },
}, {
  tableName: 'product_reviews',
  timestamps: true,
});

module.exports = ProductReview;
