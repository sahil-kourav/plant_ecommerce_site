const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage, 
} = require("../../controllers/common/feature-controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);
router.delete("/delete/:id", deleteFeatureImage); // <-- Add this line

module.exports = router;





