const {
  uploadFile,
  randomImageName,
  getObjectSignedUrl,
} = require("../utils/s3FileUpload");

const Product = require("../models/product");
const Review = require("../models/review");

const fetchReviewsWithImages = async (reviews) => {
  // Get imageUrl from s3 bucket
  await Promise.all(
    reviews.map(async (review) => {
      // Map over each picture in the review
      review.pictures = await Promise.all(
        review.pictures.map(async (picture) => {
          const imageUrl = await getObjectSignedUrl(picture);
          return imageUrl;
        })
      );
    })
  );
  return reviews;
};

exports.getReviews = async (req, res, next) => {
  const productId = req.params.productId;

  console.log(productId);

  try {
    const product = await Product.findById(productId).populate("reviews");

    const reviews = product.reviews;

    await fetchReviewsWithImages(reviews);

    const totalStars = reviews.reduce((acc, review) => acc + review.star, 0);
    const averageStar = reviews.length > 0 ? totalStars / reviews.length : 0;

    const starCount = reviews.reduce(
      (acc, review) => {
        acc[review.star] = (acc[review.star] || 0) + 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } // Initialize counts for each star
    );

    return res.status(200).send({
      message: "Get reviews succesfully!",
      reviews: reviews,
      averageStar: averageStar,
      starCount: starCount,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postReview = async (req, res, next) => {
  console.log(req.body);

  const { title, comment, reviewer, email, star, productId } = req.body;
  let imageName;

  if (req.file) {
    imageName = randomImageName();
  }

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

    // Save the review to db
    await review.save();

    // Push the review to product
    const product = await Product.findById(productId);

    if (!product) {
      const err = new Error("No product found!");
      err.statusCode = 404;
      throw err;
    }

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

    res
      .status(200)
      .json({ message: "Get review successfully!", review: review });
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

    res
      .status(200)
      .json({ message: "Review updated successfully", review: review });
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

    res
      .status(200)
      .json({ message: "Review deleted successfully", review: review });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
