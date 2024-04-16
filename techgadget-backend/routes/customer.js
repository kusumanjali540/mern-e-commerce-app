const express = require("express");
const customerController = require("../controllers/customerController");
const { body } = require("express-validator");
const Customer = require("../models/customer");

const router = express.Router();

router.get("/customers", customerController.getCustomers);
router.get("/:customerId", customerController.getCustomer);
router.post(
  "/create-customer",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const customerDoc = await Customer.findOne({ email: value });
        if (customerDoc) {
          return Promise.reject("Email already exists.");
        }
      })
      .normalizeEmail(),
    body("lastName").notEmpty().withMessage("LastName is required"),
    body("status")
      .notEmpty()
      .withMessage("Status must be either SignedUp or Guest"),
    body("password")
      .trim()
      .custom((value, { req }) => {
        if (req.body.status === "Guest") {
          return !value || value.length >= 5;
        } else {
          if (!value || value.length < 5) {
            throw new Error("Password must be at least 5 characters long");
          }
        }
        return true;
      })
      .optional(),
  ],
  customerController.postCustomer
);
router.delete("/:customerId", customerController.deleteCustomer);
router.put("/:customerId", customerController.updateCustomer);

module.exports = router;
