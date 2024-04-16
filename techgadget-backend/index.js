const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { graphqlHTTP } = require("express-graphql");
const fs = require("fs");
const {
  uploadFile,
  deleteFile,
  getObjectSignedUrl,
} = require("./utils/s3FileUpload");

const dotenv = require("dotenv");
dotenv.config();

const graphqlSchema = require("./graphql/schema/schema");
const graphqlResolver = require("./graphql/resolvers/resolvers");

const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const customerRoutes = require("./routes/customer");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");

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

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/product", productRoutes);
app.use("/review", reviewRoutes);
app.use("/category", categoryRoutes);
app.use("/customer", customerRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data?.map((err) => {
    return err.msg;
  });
  res.status(status).json({ message: message, data: data });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
