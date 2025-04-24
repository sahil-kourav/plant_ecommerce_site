// const express = require("express");

// const {
//   addProductReview,
//   getProductReviews,
// } = require("../../controllers/shop/product-review-controller");

// const router = express.Router();

// router.post("/add", addProductReview);
// router.get("/:productId", getProductReviews);

// module.exports = router;






const express = require("express");

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/product-review-controller");

const router = express.Router();

// Route to add a product review
router.post("/add", addProductReview);

// Route to get all reviews for a product
router.get("/:productId", getProductReviews);

module.exports = router;
