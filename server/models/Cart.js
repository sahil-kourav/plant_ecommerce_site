// const mongoose = require("mongoose");

// const CartSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Cart", CartSchema);
















// // models/Cart.js

// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Cart = sequelize.define("Cart", {
//   id: {
//     type: DataTypes.STRING,
//     // autoIncrement: true,
//     primaryKey: true,
//   },
//   userId: {
//     type: DataTypes.STRING,  // User ID as INTEGER, matching the User model's ID type
//     allowNull: false,
//   },
//   // items: {
//   //   type: DataTypes.JSON,   // Store array of objects (cart items)
//   //   allowNull: true,
//   // },
// }, {
//   tableName: "carts", // SQL table name
//   timestamps: true,   // createdAt and updatedAt automatic
// });

// module.exports = Cart;









// models/Cart.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cart = sequelize.define("Cart", {
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
}, {
  tableName: "carts", // SQL table name
  timestamps: true,   // createdAt and updatedAt automatic
});

module.exports = Cart;
