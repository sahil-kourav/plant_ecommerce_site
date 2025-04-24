// const Order = require("../../models/Order");

// const getAllOrdersOfAllUsers = async (req, res) => {
//   try {
//     const orders = await Order.find({});

//     if (!orders.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No orders found!",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: orders,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

// const getOrderDetailsForAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const order = await Order.findById(id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found!",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: order,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

// const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { orderStatus } = req.body;

//     const order = await Order.findById(id);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found!",
//       });
//     }

//     await Order.findByIdAndUpdate(id, { orderStatus });

//     res.status(200).json({
//       success: true,
//       message: "Order status is updated successfully!",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

// module.exports = {
//   getAllOrdersOfAllUsers,
//   getOrderDetailsForAdmin,
//   updateOrderStatus,
// };


















// // controllers/orderController.js
// const { Order, OrderItem, OrderAddress, User } = require("../../models"); // Import all required models

// const getAllOrdersOfAllUsers = async (req, res) => {
//   try {
//     const orders = await Order.findAll({
//       include: [
//         { model: User, as: "user", attributes: ["id", "userName", "email"] }, // or whatever fields you want
//         { model: OrderItem, as: "items" },
//         { model: OrderAddress, as: "address" },
//       ],
//     });

//     console.log(JSON.stringify(orders, null, 2));

//     if (!orders.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No orders found!",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: orders,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred!",
//     });
//   }
// };

// const getOrderDetailsForAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const order = await Order.findByPk(id, {
//       include: [
//         { model: User, as: "user", attributes: ["id", "userName", "email"] },
//         { model: OrderItem, as: "items" },
//         { model: OrderAddress, as: "address" },
//       ],
//     });

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found!",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: order,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred!",
//     });
//   }
// };


// // Update order status
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { orderStatus } = req.body;

//     const order = await Order.findByPk(id); // Sequelize equivalent of findById

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found!",
//       });
//     }

//     // Update the order status
//     await order.update({ orderStatus }); // Sequelize equivalent of findByIdAndUpdate

//     res.status(200).json({
//       success: true,
//       message: "Order status is updated successfully!",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred!",
//     });
//   }
// };

// module.exports = {
//   getAllOrdersOfAllUsers,
//   getOrderDetailsForAdmin,
//   updateOrderStatus,
// };
















const { Order, OrderItem, OrderAddress, User } = require("../../models"); // Models import

// Get all orders for all users
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "userName", "email", "number"] },
        { model: OrderItem, as: "items" }, // Alias "items" for OrderItem
        { model: OrderAddress, as: "address" }, // Alias "address" for OrderAddress
      ],
      logging: console.log,
    });

    // console.log(JSON.stringify(orders, null, 2));

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Get order details for admin by order ID
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: ["id", "userName", "email", "number"] },
        { model: OrderItem, as: "items" }, // Alias "items"
        { model: OrderAddress, as: "address" }, // Alias "address"
      ],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByPk(id); // Find order by primary key

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update the order status
    await order.update({ orderStatus }); // Update status

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
