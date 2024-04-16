const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/adminController");

const Admin = require("../models/admin");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Admin.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists.");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  adminController.signup
);

router.post("/login", adminController.login);
module.exports = router;
