const { Op } = require("sequelize");
const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be a string",
      });
    }

    const searchResults = await Product.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          // { description: { [Op.like]: `%${keyword}%` } },
          { category: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while searching products",
    });
  }
};

module.exports = { searchProducts };













