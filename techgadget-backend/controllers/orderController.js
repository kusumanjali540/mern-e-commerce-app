const Order = require("../models/order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

exports.createCheckoutSession = async (req, res, next) => {
  const { products: items } = req.body;

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
        images: item.product.pictures,
      },
      unit_amount: Math.round(item.product.variants[item.variant].price*100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/checkout_success",
    cancel_url: "http://localhost:3000/",
  });

  res.json({ id: session.id });
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

    res
      .status(200)
      .json({ message: "Order updated successfully", order: order });
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

    res
      .status(200)
      .json({ message: "Order deleted successfully", order: order });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
