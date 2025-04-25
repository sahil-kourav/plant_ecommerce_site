const { Feature } = require("../../models"); // Import the Feature model
const cloudinary = require("cloudinary").v2;

// Add a new feature image
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    // Create a new feature image entry in the database
    const featureImage = await Feature.create({
      image,
    });

    res.status(201).json({
      success: true,
      data: featureImage,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Get all feature images
const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.findAll();

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Delete a feature image
const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;

    const featureImage = await Feature.findByPk(id);
    if (!featureImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found!",
      });
    }

    const imageUrl = featureImage.image;

    // Extract public_id from Cloudinary URL
    const url = new URL(imageUrl);
    const pathname = url.pathname;

    const parts = pathname.split("/");
    const versionIndex = parts.findIndex((part) => part.startsWith("v"));
    const publicIdWithExt = parts.slice(versionIndex + 1).join("/"); // foldername/filename.jpg or just filename.jpg
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // remove file extension

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete the feature image from the database
    await featureImage.destroy();

    res.status(200).json({
      success: true,
      message: "Feature image deleted successfully.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Failed to delete image.",
    });
  }
};

module.exports = {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
};
