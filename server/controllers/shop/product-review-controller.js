// const Order = require("../../models/Order");
// const Product = require("../../models/Product");
// const ProductReview = require("../../models/Review");

// const addProductReview = async (req, res) => {
//   try {
//     const { productId, userId, userName, reviewMessage, reviewValue } =
//       req.body;

//     const order = await Order.findOne({
//       userId,
//       "cartItems.productId": productId,
//       // orderStatus: "confirmed" || "delivered",
//     });

//     if (!order) {
//       return res.status(403).json({
//         success: false,
//         message: "You need to purchase product to review it.",
//       });
//     }

//     const checkExistinfReview = await ProductReview.findOne({
//       productId,
//       userId,
//     });

//     if (checkExistinfReview) {
//       return res.status(400).json({
//         success: false,
//         message: "You already reviewed this product!",
//       });
//     }

//     const newReview = new ProductReview({
//       productId,
//       userId,
//       userName,
//       reviewMessage,
//       reviewValue,
//     });

//     await newReview.save();

//     const reviews = await ProductReview.find({ productId });
//     const totalReviewsLength = reviews.length;
//     const averageReview =
//       reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
//       totalReviewsLength;

//     await Product.findByIdAndUpdate(productId, { averageReview });

//     res.status(201).json({
//       success: true,
//       data: newReview,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error",
//     });
//   }
// };

// const getProductReviews = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     const reviews = await ProductReview.find({ productId });
//     res.status(200).json({
//       success: true,
//       data: reviews,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error",
//     });
//   }
// };

// module.exports = { addProductReview, getProductReviews };






















const { Order, Product, ProductReview } = require("../../models"); // assuming Sequelize ORM

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    // Check if the user has purchased the product
    const order = await Order.findOne({
      where: {
        userId,
      },
      include: [{
        model: Product,
        as: 'products',
        where: {
          id: productId,
        },
      }],
    });
    
      
    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    // Check if the user has already reviewed the product
    const existingReview = await ProductReview.findOne({
      where: { productId, userId },
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    // Add the new review
    const newReview = await ProductReview.create({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    // Recalculate average review for the product
    const reviews = await ProductReview.findAll({ where: { productId } });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, review) => sum + review.reviewValue, 0) / totalReviewsLength;

    // Update the averageReview in the Product model
    await Product.update(
      { averageReview },
      {
        where: { id: productId },
      }
    );

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding review",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.findAll({ where: { productId } });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching reviews",
    });
  }
};

module.exports = { addProductReview, getProductReviews };
