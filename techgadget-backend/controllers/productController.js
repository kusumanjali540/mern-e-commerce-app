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

const fetchOneProductWithImages = async (product) => {
  product.pictures = await Promise.all(
    product.pictures.map(async (picture) => {
      const imageUrl = await getObjectSignedUrl(picture);
      return imageUrl;
    })
  );

  return product;
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

    if (category === "all") {
      // Fetch all products if the category is all
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
      await uploadFile(file.buffer, imageName, file.mimetype);
      pictures.push(imageName);
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

exports.getFindByNameProducts = async (req, res, next) => {
  const searchTerm = req.query.search_term || "";
  console.log(searchTerm);
  try {
    const products = await Product.find({
      name: { $regex: new RegExp(searchTerm.toLowerCase(), "i") },
    });

    if (!products) {
      const error = new Error("No products matched");
      error.statusCode = 404;
      throw error;
    }

    await fetchProductsWithImages(products);

    const totalItems = products.length || 0;

    return res.status(200).json({
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

exports.getProductForCartItem = async (req, res, next) => {
  try {
    const { productId, variant_properties } = req.query;

    console.log(productId);
    console.log(variant_properties);
    // Step 1: Parse the variant_properties string into an object
    const parsedVariantProperties = JSON.parse(variant_properties);

    // Step 2: Find the product by productId in the database
    const product = await Product.findById(productId);

    console.log("Product", product);

    if (!product) {
      throw Error("Product not found!");
    }

    await fetchOneProductWithImages(product);

    console.log(product.variants);
    // Step 3: Find the specific variant that matches the variant_properties
    const selectedVariant = product.variants.find((variant) => {
      const variantProps = Object.fromEntries(variant.properties); // Convert Map to Object
      return Object.entries(parsedVariantProperties).every(
        ([key, value]) => variantProps[key] === value
      );
    });

    if (!selectedVariant) {
      throw Error("Variant not found!");
    }

    const toObjectProperties = Object.fromEntries(selectedVariant.properties);

    console.log("Product and variant found");

    const responseProduct = product.toObject();
    delete responseProduct.variants; // Remove the variants field

    // Add the selected variant details
    responseProduct.properties = toObjectProperties;
    responseProduct.price = selectedVariant.price;
    responseProduct.quantity = selectedVariant.quantity;

    console.log("RES", responseProduct);

    res.status(201).json({ product: responseProduct });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
