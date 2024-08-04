const express = require("express");
const { body } = require("express-validator");

const contactController = require("../controllers/contactController");
const validateRequest = require("../middleware/validate-request");

const router = express.Router();

router.post(
  "/submit-contact-form",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("name").notEmpty().withMessage("Please enter name!"),
    body("comment").notEmpty().withMessage("Comment is required!"),
  ],
  validateRequest,
  contactController.submitContactForm
);

module.exports = router;
