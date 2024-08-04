const {
  uploadFile,
  randomImageName,
  getObjectSignedUrl,
} = require("../utils/s3FileUpload");

const Product = require("../models/product");
const Review = require("../models/review");

exports.getReviews = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId).populate("reviews");

    const reviews = product.reviews;

    console.log(reviews);

    for (let review of reviews) {
      if (review.pictures.length > 0) {
        review.imageUrl = await getObjectSignedUrl(review.pictures[0]);
      }
    }

    return res
      .status(200)
      .send({ message: "Get reviews succesfully!", reviews: reviews });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postReview = async (req, res, next) => {
  let imageName = null;

  if (req.file) {
    imageName = randomImageName();
  }

  const { title, comment, reviewer, email, star } = req.body;
  const productId = req.body.productId;

  const review = new Review({
    title,
    comment,
    pictures: imageName ? [imageName] : [],
    reviewer,
    email,
    star,
  });

  try {
    if (req.file) {
      console.log(req.file.buffer);
      console.log(req.file.mimetype);

      await uploadFile(req.file.buffer, imageName, req.file.mimetype);
    }

    await review.save();

    const product = await Product.findById(productId);
    console.log(product);

    product.reviews.push(review);

    await product.save();

    res.status(201).json({
      message: "Review created successfully",
      product: product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }

    if (review.pictures.length > 0) {
      review.imageUrl = await getObjectSignedUrl(review.pictures[0]);
    }

    res.status(200).json({ message: "Get review successfully!", review: review });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }

    const { title, comment, star } = req.body;

    review.title = title || review.title;
    review.comment = comment || review.comment;
    review.star = star || review.star;

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review: review });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }

    await Review.findByIdAndRemove(reviewId);

    res.status(200).json({ message: "Review deleted successfully", review: review });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};