const Order = require("../models/order");
const Product = require("../models/product");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  uploadFile,
  randomImageName,
  getObjectSignedUrl,
} = require("../utils/s3FileUpload");

const fetchProductsWithImages = async (products) => {
  // Get imageUrl from s3 bucket
  await Promise.all(
    products.map(async (product) => {
      // Map over each picture in the product
      product.pictures = await Promise.all(
        product.pictures.map(async (picture) => {
          const imageUrl = await getObjectSignedUrl(picture);
          return imageUrl;
        })
      );
    })
  );
  return products;
};

const fetchOneProductWithImages = async (product) => {
  product.pictures = await Promise.all(
    product.pictures.map(async (picture) => {
      const imageUrl = await getObjectSignedUrl(picture);
      return imageUrl;
    })
  );

  return product;
};

exports.getOrders = async (req, res, next) => {
  try {
    //Fetch orders

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

exports.getOrdersBySession = async (req, res, next) => {
  const customerId = req.currentCustomer.id;
  try {
    //Fetch orders
    const orders = await Order.find({ customer: customerId }).populate(
      "items.product"
    );

    // Extract items from all orders, adding the `createdAt` field to each item
    const itemsWithCreatedAt = orders.flatMap((order) =>
      order.items.map((item) => {
        // Convert the variant Map to a plain object
        const propertiesObject = Object.fromEntries(item.variant.properties);

        return {
          ...item.toObject(),
          variant: { ...item.variant, properties: propertiesObject },
          createdAt: order.createdAt,
          status: order.status,
        };
      })
    );

    const fetchItemsWithImages = async (itemsWithCreatedAt) => {
      await Promise.all(
        itemsWithCreatedAt.map(async (item) => {
          item.product = await fetchOneProductWithImages(item.product);
        })
      );
      return itemsWithCreatedAt;
    };

    // Usage
    const itemsWithCreatedAtAndImages = await fetchItemsWithImages(
      itemsWithCreatedAt
    );

    return res.status(200).json({
      message: "Get orders succesfully!",
      items: itemsWithCreatedAtAndImages,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const { items, customer, status } = req.body;

    console.log(items[0].product.product.price);

    let orderer = customer ? customer : req?.currentCustomer?.id;

    if (!orderer) {
      throw Error("Order can't be proceed, try again later!");
    }

    // Fetch product data to ensure variants and prices are accurate
    const populatedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          console.log(`Product not found for ID: ${item.productId}`);
          throw new Error("Product not found");
        }

        const variant = product.variants.find((v) =>
          Object.entries(item.variantProperties).every(
            ([key, value]) => v.properties.get(key) === value
          )
        );

        if (!variant) {
          console.log(
            `Variant not found for product ID: ${item.productId} with properties:`,
            item.variantProperties
          );
          throw new Error("Variant not found");
        }

        // Check if the provided price matches the price in the database
        if (item.product.product.price !== variant.price) {
          console.log(
            `Price mismatch for product ID: ${item.productId}. Provided: ${item.price}, Expected: ${variant.price}`
          );
          throw new Error("Price mismatch");
        }

        // Check if the requested quantity is available
        if (item.quantity > variant.quantity) {
          console.log(
            `Insufficient quantity for product ID: ${item.productId}. Requested: ${item.quantity}, Available: ${variant.quantity}`
          );
          throw new Error("Insufficient quantity available");
        }

        console.log(
          `Product ID: ${item.productId} - Price and quantity verified successfully.`
        );

        return {
          product: item.productId,
          variant: {
            properties: variant.properties,
            price: variant.price,
          },
          quantity: item.quantity,
        };
      })
    );

    const order = new Order({
      items: populatedItems,
      customer: orderer,
      status,
    });

    // The totals will be calculated automatically in the pre-save hook
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createCheckoutSession = async (req, res, next) => {
  const order = req.body;

  console.log("Oh I get this", order);

  const populatedOrder = await Order.findById(order._id).populate(
    "items.product"
  );

  if (!order) {
    throw Error("Something has gone wrong!");
  }

  // Fetch images for all products in the order
  const productsWithImages = await fetchProductsWithImages(
    populatedOrder.items.map((item) => item.product)
  );

  // Update the populatedOrder with products containing images
  populatedOrder.items = populatedOrder.items.map((item) => {
    const productWithImages = productsWithImages.find(
      (p) => p._id.toString() === item.product._id.toString()
    );
    return {
      ...item,
      product: productWithImages,
    };
  });

  const lineItems = populatedOrder.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
        images: item.product.pictures,
      },
      unit_amount: Math.round(item.variant.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.SUCCESS_URL}/${order._id}`,
    cancel_url: process.env.CANCEL_URL,
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

exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const updatedData = req.body;

  try {
    // Find the order by ID and update it with the provided data
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    // Update the order fields
    order.items = updatedData.items || order.items;
    order.status = updatedData.status || order.status;
    order.customer = updatedData.customer || order.customer;

    // Recalculate totals
    if (updatedData.items) {
      order.calculateTotals();
    }

    // Save the updated order
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
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
