const Category = require("../models/category");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ message: "Get categories succesfully!", categories });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postCategory = async (req, res, next) => {
  const { name } = req.body;

  try {
    const category = new Category({
      name: name,
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category: category,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
