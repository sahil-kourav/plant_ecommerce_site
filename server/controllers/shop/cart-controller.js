const { Cart, CartItem, Product } = require("../../models");  // Import CartItem

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    let [item, created] = await CartItem.findOrCreate({
      where: {
        cartId: cart.id,
        productId,
      },
      defaults: { quantity },
    });

    if (!created) {
      item.quantity += quantity;
      await item.save();
    }

    res.status(200).json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};


const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory!",
      });
    }

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        as: "CartItems", 
        include: {
          model: Product,
          attributes: ["image", "title", "price", "salePrice"],
        },
      },
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const populateCartItems = cart.CartItems.map((item) => ({
      productId: item.productId,
      image: item.Product.image,
      title: item.Product.title,
      price: item.Product.price,
      salePrice: item.Product.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart.dataValues, items: populateCartItems },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart items",
    });
  }
};

const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Find the specific CartItem
    const cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId,
      },
      include: {
        model: Product,
        attributes: ["id", "image", "title", "price", "salePrice"],
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present!",
      });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    // Re-fetch all cart items for updated response
    const updatedCartItems = await CartItem.findAll({
      where: { cartId: cart.id },
      include: {
        model: Product,
        attributes: ["id", "image", "title", "price", "salePrice"],
      },
    });

    // Format like Mongoose version
    const populateCartItems = updatedCartItems.map((item) => ({
      productId: item.Product ? item.Product.id : null,
      image: item.Product ? item.Product.image : null,
      title: item.Product ? item.Product.title : "Product not found",
      price: item.Product ? item.Product.price : null,
      salePrice: item.Product ? item.Product.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart.dataValues,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating cart item quantity",
    });
  }
};


// Delete cart item
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Delete the item from the CartItem table
    const deleted = await CartItem.destroy({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found!",
      });
    }

    // Return updated cart
    const updatedCartItems = await CartItem.findAll({
      where: { cartId: cart.id },
      include: {
        model: Product,
        attributes: ["id", "image", "title", "price", "salePrice"],
      },
    });

    const populateCartItems = updatedCartItems.map((item) => ({
      productId: item.productId,
      image: item.Product.image,
      title: item.Product.title,
      price: item.Product.price,
      salePrice: item.Product.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: {
        ...cart.dataValues,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting cart item",
    });
  }
};

module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
};
