const sequelize = require("../config/db");

// Import all models
const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");
const { CartItem, Order, OrderItem, OrderAddress } = require("./Order");
const Feature = require("./Feature");
const Address = require("./Address");
const ProductReview = require("./Review");

// 👤 User - Order (One-to-Many)
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// 👤 User - Cart (One-to-Many)
User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

// 🛒 Cart - CartItem (One-to-Many)
Cart.hasMany(CartItem, { as: "CartItems", foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

// 🛒 Product - CartItem (One-to-Many)
Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

// 🛍️ Product - ProductReview (One-to-Many)
Product.hasMany(ProductReview, { foreignKey: "productId" });
ProductReview.belongsTo(Product, { foreignKey: "productId" });

// 👤 User - ProductReview (One-to-Many)
User.hasMany(ProductReview, { foreignKey: "userId" });
ProductReview.belongsTo(User, { foreignKey: "userId" });

// 📦 Order - OrderItem (One-to-Many)
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

// 📍 Order - OrderAddress (One-to-One)
Order.hasOne(OrderAddress, { foreignKey: "orderId", as: "address" });
OrderAddress.belongsTo(Order, { foreignKey: "orderId" });

// 🏠 User - Address (One-to-Many)
User.hasMany(Address, { foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });

// 📦 Order - Product (Many-to-Many through OrderItem)
Order.belongsToMany(Product, { through: OrderItem, foreignKey: "orderId", otherKey: "productId", as: "products", });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: "productId", otherKey: "orderId", as: "orders", });


module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  OrderAddress,
  Feature,
  Address,
  ProductReview,
};
