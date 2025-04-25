// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   userId: String,
//   cartId: String,
//   cartItems: [
//     {
//       productId: String,
//       title: String,
//       image: String,
//       price: String,
//       quantity: Number,
//     },
//   ],
//   addressInfo: {
//     addressId: String,
//     address: String,
//     city: String,
//     pincode: String,
//     phone: String,
//     notes: String,
//   },
//   orderStatus: String,
//   paymentMethod: String,
//   paymentStatus: String,
//   totalAmount: Number,
//   orderDate: Date,
//   orderUpdateDate: Date,
//   paymentId: String,
//   payerId: String,
// });

// module.exports = mongoose.model("Order", OrderSchema);











// // models/Order.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Order = sequelize.define("Order", {
//   userId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   cartId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   orderStatus: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   paymentMethod: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   paymentStatus: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   totalAmount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   orderDate: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   orderUpdateDate: {
//     type: DataTypes.DATE,
//     allowNull: true,
//   },
//   paymentId: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   payerId: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// }, {
//   tableName: "orders",
//   timestamps: true,
// });

// const OrderItem = sequelize.define("OrderItem", {

//   orderId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },

//   productId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   image: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   price: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   quantity: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     validate: {
//       min: 1,
//     },
//   },
// }, {
//   tableName: "order_items",
//   timestamps: true,
// });

// const OrderAddress = sequelize.define("OrderAddress", {
//   orderId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   addressId: {
//     type: DataTypes.STRING,
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
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
// }, {
//   tableName: "order_addresses",
//   timestamps: true,
// });



// const CartItem = sequelize.define("CartItem", {
//   quantity: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     validate: {
//       min: 1, // Ensure quantity is at least 1
//     },
//   },
//   cartId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   productId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }, {
//   tableName: "cart_items", 
//   timestamps: true,
// });


// module.exports = { CartItem,Order, OrderItem, OrderAddress };












const { DataTypes, UUIDV4 } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const sequelize = require("../config/db");

// 🧾 Order
const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,  // Automatically generate a UUID
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,  // Change to UUID to match the user model
    allowNull: false,
  },
  cartId: {
    type: DataTypes.UUID ,
    allowNull: false,
  },
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  orderUpdateDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payerId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "orders",
  timestamps: true,              
  createdAt: "orderDate",       
  updatedAt: "updatedDate", 
});


// 📦 OrderItem
const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
    allowNull: false,
  },
  orderId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
}, {
  tableName: "order_items",
});

// 🏠 OrderAddress
const OrderAddress = sequelize.define("OrderAddress", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
    allowNull: false,
  },
  orderId: {
    type: DataTypes.UUID,  // Use UUID here as well since it's a foreign key
    allowNull: false,
  },
  addressId: {
    type: DataTypes.UUID,
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
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "order_addresses",
});

// 🛒 CartItem
const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate a UUID
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  cartId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: "cart_items",
});

module.exports = {
  Order,
  OrderItem,
  OrderAddress,
  CartItem
};
