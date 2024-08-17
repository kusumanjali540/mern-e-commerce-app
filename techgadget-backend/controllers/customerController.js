const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { saltRounds } = require("../utils/constants");

// Customer Authentication
exports.signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    console.log(req.body);

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      throw new Error("Email in use");
    }

    const hashedPw = await bcrypt.hash(password, saltRounds);

    const customer = new Customer({
      firstName,
      lastName,
      email,
      password: hashedPw,
    });

    await customer.save();

    // Generate JWT
    const customerAuthJwt = jwt.sign(
      {
        id: customer._id,
        email: customer.email,
        role: "customer",
      },
      "somesecretkey"
    );

    // Store it on session object
    req.session = {
      jwt: customerAuthJwt,
    };

    console.log(req.session);

    res.status(201).json({ message: "User created!", user: customer });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Customer.findOne({ email });
    if (!existingUser) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 404;
      throw error;
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 404;
      throw error;
    }

    // Generate JWT
    const customerAuthJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: "customer",
      },
      "somesecretkey"
    );

    // Store it on session object
    req.session = {
      jwt: customerAuthJwt,
    };

    res.status(200).send(existingUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.signout = async (req, res, next) => {
  req.session = null;
  res.send({});
};

exports.currentCustomer = (req, res, next) => {
  res.send({ currentCustomer: req.currentCustomer || null });
};

exports.getCustomerBySession = async (req, res, next) => {
  console.log("I called");
  try {
    console.log("Customer", req.currentCustomer);
    if (!req.currentCustomer) {
      res.status(200).send({ user: null });
    }

    const user = await Customer.findById(req.currentCustomer?.id || "");
    if (!user) {
      const error = new Error("User's not found!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).send({ user: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// CRUD on Customer information
exports.getCustomers = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 4;
  try {
    const totalItems = await Customer.find().countDocuments();

    const customers = await Customer.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched customers successfully",
      customers: customers,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postCustomer = async (req, res, next) => {
  try {
    const formData = req.body;
    console.log(formData);

    let hashedPassword = "";
    if (formData.password) {
      hashedPassword = await bcrypt.hash(formData.password, 12);
    }

    const newCustomer = new Customer({
      email: formData.email,
      password: hashedPassword,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipcode: formData.zipcode,
      status: formData.status,
    });
    await newCustomer.save();
    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ message: "Get customer successfully!", customer: customer });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  const customerId = req.currentCustomer.id;
  const formData = req.body;

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }

    customer.email = formData.email ?? customer.email;
    customer.password = formData.password ?? customer.password;
    customer.firstName = formData.firstName ?? customer.firstName;
    customer.lastName = formData.lastName ?? customer.lastName;
    customer.address = formData.address ?? customer.address;
    customer.country = formData.country ?? customer.country;
    customer.city = formData.city ?? customer.city;
    customer.state = formData.state ?? customer.state;
    customer.zipcode = formData.zipcode ?? customer.zipcode;
    customer.status = formData.status ?? customer.status;

    await customer.save();

    res
      .status(200)
      .json({ message: "Customer updated successfully", customer: customer });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }

    await Customer.findOneAndDelete({ _id: customerId });

    res
      .status(200)
      .json({ message: "Customer deleted successfully", customer: customer });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
