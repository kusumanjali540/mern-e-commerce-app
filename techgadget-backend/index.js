const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { graphqlHTTP } = require("express-graphql");
const fs = require("fs");
const cookieSession = require("cookie-session");

const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const customerRoutes = require("./routes/customer");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");
const currentAdmin = require("./middleware/current-admin");
const errorHandler = require("./middleware/error-handler");
const currentCustomer = require("./middleware/current-customer");

const app = express();

const storage = multer.memoryStorage();
const upload = multer();

// const { v4: uuidv4 } = require("uuid");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4());
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
// app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  cookieSession({
    name: "session",
    keys: ["somecookiesecretkey"],
    signed: false,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

//CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://mern-e-commerce-app-six.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(currentAdmin);
app.use(currentCustomer);

// Routes
app.use("/product", productRoutes);
app.use("/review", reviewRoutes);
app.use("/category", categoryRoutes);
app.use("/customer", customerRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);
app.use("/contact", contactRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
