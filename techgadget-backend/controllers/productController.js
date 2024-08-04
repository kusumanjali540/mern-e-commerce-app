const fs = require("fs");
const path = require("path");
const {
  uploadFile,
  randomImageName,
  getObjectSignedUrl,
} = require("../utils/s3FileUpload");
const { validationResult } = require("express-validator");

const Product = require("../models/product");
const Category = require("../models/category");

const fetchProductsWithImages = async (products) => {
  // Get imageUrl from s3 bucket
  await Promise.all(
    products.map(async (product) => {
      // Map over each picture in the product
      product.pictures = await Promise.all(
        product.pictures.map(async (picture) => {
          const imageUrl = await getObjectSignedUrl(picture);
          return imageUrl;
        })
      );
    })
  );
  return products;
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const totalItems = await Product.find().countDocuments();

    const products = await Product.find().populate("categories");

    // Get imageUrl from s3 bucket
    await fetchProductsWithImages(products);

    res.status(200).json({
      message: "Fetched product successfully",
      products: products,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getProducts = async (req, res, next) => {
  const category = req.query.category || "all";
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 4;
  console.log(category);
  try {
    let products;
    let totalItems;

    if (category === "all") { // Fetch all products if the category is all
      products = await Product.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      totalItems = await Product.find().countDocuments();

      await fetchProductsWithImages(products);

      return res.status(200).json({
        message: "Fetched product successfully",
        products: products,
        totalItems: totalItems,
      });
    }

    const fetchedCategory = await Category.findOne({
      name: category,
    }).populate("products");

    if (!fetchedCategory) {
      const error = new Error("No such category is in the system.");
      error.statusCode = 404;
      throw error;
    }

    products = [...fetchedCategory.products];

    totalItems = products.length;

    console.log(totalItems);

    // Apply pagination
    products = products.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

    // Get imageUrl from s3 bucket
    await fetchProductsWithImages(products);

    res.status(200).json({
      message: "Fetched product successfully",
      products: products,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.files);

  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  const { name, brand, description, variants, category } = req.body;
  const pictures = [];

  const newVariants = JSON.parse(variants);
  console.log(newVariants);

  try {
    const fetchedCategory = await Category.findOne({ name: category });

    console.log(fetchedCategory);

    if (!fetchedCategory) {
      const error = new Error(
        "No category is matched, consider create new category group."
      );
      error.statusCode = 404;
      throw error;
    }

    for (const file of req.files) {
      const imageName = randomImageName();
      pictures.push(imageName);
      await uploadFile(file.buffer, imageName, file.mimetype);
    }

    const newProduct = new Product({
      name,
      brand,
      description,
      variants: newVariants,
      pictures,
      categories: [fetchedCategory._id],
    });

    const returnedNewProduct = await newProduct.save();

    fetchedCategory.products.push(returnedNewProduct._id);

    await fetchedCategory.save();
    // await user.save();
    // io.getIO().emit("products", {
    //   action: "create",
    //   product: {
    //     ...product._doc,
    //     creator: { _id: req.userId, name: user.name },
    //   },
    // });
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    await Promise.all(
      // Map over each picture in the product
      (product.pictures = await Promise.all(
        product.pictures.map(async (picture) => {
          const imageUrl = await getObjectSignedUrl(picture);
          return imageUrl;
        })
      ))
    );

    return res
      .status(200)
      .send({ message: "Fetch product succesfully!", product: product });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const name = req.body.name;
  const brand = req.body.brand;
  const description = req.body.description;
  const variants = req.body.variants;

  const pictures = [];

  //Upload pictures to s3 bucket
  if (req.files) {
    for (const file of req.files) {
      const imageName = randomImageName();

      pictures.push(imageName);
      try {
        await uploadFile(file.buffer, imageName, file.mimetype);
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
    }
  }

  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    if (name) product.name = name;
    if (brand) product.brand = brand;
    if (description) product.description = description;
    if (variants) product.variants = variants;
    if (pictures.length > 0) product.pictures = pictures;

    const result = await product.save();
    res.status(200).json({ message: "Product updated!", product: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      const error = new Error("Could not find product.");
      error.statusCode = 404;
      throw error;
    }

    // if (product.creator.toString() !== req.userId) {
    //   const error = new Error("Not authorized");
    //   error.statusCode = 403;
    //   throw error;
    // }

    // clearImage(product.imageUrl);

    await Product.findOneAndDelete({ _id: productId });

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
