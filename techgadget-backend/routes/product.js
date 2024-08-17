const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const productController = require("../controllers/productController");
const validateRequest = require("../middleware/validate-request");
const isAuthAdmin = require("../middleware/is-auth-admin");
const isAuth = require("../middleware/is-auth-admin-or-customer");

const router = express.Router();
exports.router = router;

router.get("/products", productController.getProducts);
router.get(
  "/product-for-cart-item",
  isAuth,
  productController.getProductForCartItem
);
router.get("/find-by-name-products", productController.getFindByNameProducts);
router.get("/all-products", productController.getAllProducts);
router.get("/:productId", productController.getProduct);
router.post(
  "/create-product",
  upload.array("pictures"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("brand").notEmpty().withMessage("Brand is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("variants").isArray({ min: 1 }).withMessage("Variants are required"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  validateRequest,
  isAuthAdmin,
  productController.createProduct
);
router.put(
  "/:productId",
  upload.array("pictures"),
  isAuthAdmin,
  productController.updateProduct
);
router.delete("/:productId", isAuthAdmin, productController.deleteProduct);
// router.post(
//   "/post",
//   isAuth,
//   [
//     body("title").trim().isLength({ min: 5 }),
//     body("content").trim().isLength({ min: 5 }),
//   ],
//   feedController.createPost
// );

// router.get("/post/:postId", isAuth, feedController.getPost);

// router.put(
//   "/post/:postId",
//   isAuth,
//   [
//     body("title").trim().isLength({ min: 5 }),
//     body("content").trim().isLength({ min: 5 }),
//   ],
//   feedController.updatePost
// );

// router.delete("/post/:postId", isAuth, feedController.deletePost);
module.exports = router;
