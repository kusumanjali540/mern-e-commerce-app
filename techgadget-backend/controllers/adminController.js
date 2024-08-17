const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");
const { saltRounds } = require("../utils/constants");

exports.signup = async (req, res, next) => {
  try {
    const { email, password, secretcode } = req.body;

    if (!secretcode || secretcode !== "somesecretcode") {
      throw new Error("You do not have permission to sign up!");
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new Error("Email in use");
    }

    const hashedPw = await bcrypt.hash(password, saltRounds);

    const admin = new Admin({ email, password: hashedPw });
    await admin.save();

    // Generate JWT
    const adminJwt = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },
      "somesecretkey"
    );

    // Store it on session object
    req.session = {
      jwt: adminJwt,
    };

    console.log(req.session);

    res.status(201).json({ message: "Admin created!", admin: admin });
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
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 404;
      throw error;
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!passwordsMatch) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 404;
      throw error;
    }

    // Generate JWT
    const adminJwt = jwt.sign(
      {
        id: existingAdmin.id,
        email: existingAdmin.email,
        role: "admin",
      },
      "somesecretkey"
    );

    // Store it on session object
    req.session = {
      jwt: adminJwt,
    };

    res.status(200).send(existingAdmin);
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

exports.currentAdmin = (req, res, next) => {
  res.send({ currentAdmin: req.currentAdmin || null });
};
