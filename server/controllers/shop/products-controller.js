const Product = require("../../models/Product");
const { Op } = require("sequelize");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};
    
    if (category.length) {
      filters.category = { [Op.in]: category.split(",") };  // Sequelize specific operator
    }

    let sort = [];
    switch (sortBy) {
      case "price-lowtohigh":
        sort.push(['price', 'ASC']);
        break;
      case "price-hightolow":
        sort.push(['price', 'DESC']);
        break;
      case "title-atoz":
        sort.push(['title', 'ASC']);
        break;
      case "title-ztoa":
        sort.push(['title', 'DESC']);
        break;
      default:
        sort.push(['price', 'ASC']);
        break;
    }

    const products = await Product.findAll({
      where: filters,
      order: sort,
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e); // Fixed the variable name
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);  // Sequelize uses `findByPk` for primary key lookups

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e); // Fixed the variable name
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
