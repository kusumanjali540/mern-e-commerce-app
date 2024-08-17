const express = require("express");
const { body } = require("express-validator");

const orderController = require("../controllers/orderController");
const isAuth = require("../middleware/is-auth-admin-or-customer");
const validateRequest = require("../middleware/validate-request");
const isAuthCustomer = require("../middleware/is-auth-customer");

const router = express.Router();

router.get("/orders", orderController.getOrders);
router.get(
  "/orders-by-session",
  isAuthCustomer,
  orderController.getOrdersBySession
);
router.get("/:orderId", orderController.getOrder);
router.post(
  "/create-order",
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items should be an array with at least one item."),

  body("status")
    .isIn(["Pending", "Paid", "Refunded", "Cancelled"])
    .withMessage("Invalid order status."),
  validateRequest,
  isAuth,
  orderController.postOrder
);
router.delete("/:orderId", orderController.deleteOrder);
router.put("/:orderId", isAuth, orderController.updateOrder);
router.post(
  "/create-checkout-session",
  isAuth,
  orderController.createCheckoutSession
);

module.exports = router;
