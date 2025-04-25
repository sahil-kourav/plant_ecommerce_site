const { Address, Order, OrderAddress } = require("../../models"); // Ensure Order and OrderAddress models are imported

// Add a new address
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Create a new address entry in the database
    const newlyCreatedAddress = await Address.create({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Fetch all addresses for a user
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    // Fetch all addresses for the given user ID
    const addressList = await Address.findAll({ where: { userId } });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Edit an address
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    // Find and update the address based on userId and addressId
    const address = await Address.findOne({
      where: { id: addressId, userId },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Update the address
    await address.update(formData);

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    // Find and delete the address based on userId and addressId
    const address = await Address.findOne({
      where: { id: addressId, userId },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Delete the address
    await address.destroy();

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// Create an order and associate with address
const createOrder = async (req, res) => {
  try {
    const { userId, addressId, items } = req.body;

    if (!userId || !addressId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find the address to associate with the order
    const address = await Address.findOne({ where: { id: addressId, userId } });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Create the order
    const newOrder = await Order.create({ userId, totalAmount: calculateTotalAmount(items) });

    // Create the OrderAddress association
    await OrderAddress.create({
      orderId: newOrder.id,
      addressId: address.id, // Ensure this is not null
      address: address.address,
      city: address.city,
      pincode: address.pincode,
      phone: address.phone,
      notes: address.notes,
    });

    // Handle the items in the order
    for (const item of items) {
      // Assuming an order item model exists
      await OrderItem.create({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    res.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

// Helper function to calculate total order amount (based on the items)
const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress, createOrder };
