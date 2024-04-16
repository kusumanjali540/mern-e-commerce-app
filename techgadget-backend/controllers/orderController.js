const Order = require("../models/order");

exports.getOrders = async (req, res, next) => {
  try {
    return res
      .status(200)
      .send({ message: "Get orders succesfully!", orders: orders });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    // Create cusstomer if not found

    // Post the order to database

    // Update products quantity

    
    res.status(201).json({
      message: "Order created successfully",
      product: product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Get order successfully!", order: order });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    await order.save();

    res.status(200).json({ message: "Order updated successfully", order: order });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    await Order.findByIdAndRemove(orderId);

    res.status(200).json({ message: "Order deleted successfully", order: order });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};