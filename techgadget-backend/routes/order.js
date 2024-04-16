const express = require("express");

const orderController = require("../controllers/orderController");

const router = express.Router();

router.get("/orders", orderController.getOrders);
router.get("/:orderId", orderController.getOrder);
router.post("/create-order", orderController.postOrder);
router.delete("/:orderId", orderController.deleteOrder);
router.put("/:orderId", orderController.updateOrder);

module.exports = router;
