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
