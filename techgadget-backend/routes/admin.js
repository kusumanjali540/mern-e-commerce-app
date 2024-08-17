const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/adminController");

const validateRequest = require("../middleware/validate-request");
const currentAdmin = require("../middleware/current-admin");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long."),
  ],
  validateRequest,
  adminController.signup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password").trim(),
  ],
  validateRequest,
  adminController.signin
);

router.post("/signout", adminController.signout);
router.get("/current-admin", currentAdmin, adminController.currentAdmin);

module.exports = router;
