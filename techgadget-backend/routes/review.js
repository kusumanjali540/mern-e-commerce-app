const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");

const reviewController = require("../controllers/reviewController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/reviews/:productId", reviewController.getReviews);
router.get("/review/:reviewId", reviewController.getReview);
router.post(
  "/post-review",
  upload.single("image"),
  reviewController.postReview
);
router.delete("/delete-review/:reviewId", reviewController.deleteReview);
router.delete("/update-review", reviewController.updateReview);

module.exports = router;
