const paypal = require("../../helpers/paypal");
const { Order, OrderItem, OrderAddress, Cart, Product } = require("../../models");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Validate required fields, especially addressId
    const { addressId, address, city, pincode, phone, notes } = addressInfo;

    if (!addressId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided! Missing addressId or address details!",
      });
    }

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
        // MySQL Query to insert new order into the database
        const newlyCreatedOrder = await Order.create({
          userId,
          cartId,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderUpdateDate,
          paymentId,
          payerId,
          orderDate: new Date(), 
          });
          

        // Insert all OrderItems (loop through cartItems)
        for (const item of cartItems) {
          await OrderItem.create({
            orderId: newlyCreatedOrder.id,
            productId: item.productId,
            title: item.title,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            orderDate: new Date(), // explicitly passing current date

          });
        }

        //  Insert OrderAddress with validated addressId
        await OrderAddress.create({
          orderId: newlyCreatedOrder.id,
          addressId: addressInfo.addressId, // Make sure addressId is passed here
          address: addressInfo.address,
          city: addressInfo.city,
          pincode: addressInfo.pincode,
          phone: addressInfo.phone,
          notes: addressInfo.notes,
        });

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder.id, // assuming Sequelize will return the MySQL id
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // Update payment and order status first
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    await order.save(); // Save the order before updating products

    //  Fetch all related order items from OrderItem table
    const orderItems = await OrderItem.findAll({
      where: { orderId },
    });

    //  Update product stock
    for (let item of orderItems) {
      const product = await Product.findByPk(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found`,
        });
      }

      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product: ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    //  Delete the cart after successful confirmation
    await Cart.destroy({
      where: { id: order.cartId },
    });

    res.status(200).json({
      success: true,
      message: "Order confirmed",
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
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          as: 'products', // Alias ko yaha sahi se mention kiya
          through: {
            attributes: ['quantity', 'price'], // OrderItem se quantity aur price bhi chahiye
          }
        }
      ]
    });

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


const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        { model: OrderAddress, as: "address" },
        { model: OrderItem, as: "items" },
      ]
    });
    
    // console.log(JSON.stringify(order, null, 2));


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

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
