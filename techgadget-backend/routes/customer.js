const express = require("express");
const customerController = require("../controllers/customerController");
const { body } = require("express-validator");
const Customer = require("../models/customer");
const validateRequest = require("../middleware/validate-request");
const isAuthAdmin = require("../middleware/is-auth-admin");
const currentCustomer = require("../middleware/current-customer");
const isAuth = require("../middleware/is-auth-admin-or-customer");
const isAuthCustomer = require("../middleware/is-auth-customer");

const router = express.Router();

// User Authentication
router.post(
  "/signup",
  [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required.")
      .trim()
      .escape(),
    body("lastName")
      .notEmpty()
      .withMessage("Last name is required.")
      .trim()
      .escape(),
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
  customerController.signup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is required."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ],
  validateRequest,
  customerController.signin
);

router.post("/signout", customerController.signout);
router.get(
  "/current-customer",
  currentCustomer,
  customerController.currentCustomer
);
router.get(
  "/customer-by-session",
  isAuthCustomer,
  customerController.getCustomerBySession
);

// User CRUD
router.get("/customers", isAuthAdmin, customerController.getCustomers);
router.get("/:customerId", isAuth, customerController.getCustomer);
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
  validateRequest,
  isAuth,
  customerController.postCustomer
);
router.delete("/:customerId", isAuth, customerController.deleteCustomer);
router.put(
  "/update-customer-by-session",
  isAuthCustomer,
  customerController.updateCustomer
);

module.exports = router;
