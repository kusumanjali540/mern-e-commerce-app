const Customer = require("../models/customer");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
  const customerId = req.params.customerId;
  const formData = req.body;

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }

    customer.email = formData.email;
    customer.password = formData.password;
    customer.firstName = formData.firstName;
    customer.lastName = formData.lastName;
    customer.address = formData.address;
    customer.city = formData.city;
    customer.state = formData.state;
    customer.zipcode = formData.zipcode;
    customer.status = formData.status;

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
