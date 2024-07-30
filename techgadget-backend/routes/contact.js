const express = require("express");
const { body } = require("express-validator");

const contactController = require("../controllers/contactController");

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
  contactController.submitContactForm
);

module.exports = router;
