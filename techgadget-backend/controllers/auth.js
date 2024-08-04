// const Admin = require("../models/admin");
// const { validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.signup = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty) {
//     const error = new Error("Validation failed.");
//     error.statusCode = 422;
//     error.data = errors.array();
//     throw error;
//   }

//   try {
//     const { email, password } = req.body;

//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       throw new Error("Email in use");
//     }

//     const hashedPw = await bcrypt.hash(password, 12);

//     const user = new Admin({ email, password: hashedPw });
//     await user.save();

//     // Generate JWT
//     const userJwt = jwt.sign(
//       {
//         id: user.id,
//         email: user.email,
//       },
//       "somesecretkey"
//     );

//     // Store it on session object
//     req.session = {
//       jwt: userJwt,
//     };

//     res.status(201).json({ message: "Admin created!", user: user });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

// exports.login = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   let loadedAdmin;
//   Admin.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         const error = new Error("A user with this email could not be found!");
//         error.statusCode = 401;
//         throw error;
//       }
//       loadedAdmin = user;
//       return bcrypt.compare(password, user.password);
//     })
//     .then((isEqual) => {
//       if (!isEqual) {
//         const error = new Error("Wrong password");
//         error.statusCode = 401;
//         throw error;
//       }
//       const token = jwt.sign(
//         {
//           email: loadedAdmin.email,
//           userId: loadedAdmin._id.toString(),
//         },
//         "nguyenchikha",
//         {
//           expiresIn: "1h",
//         }
//       );
//       res.status(200).json({ token: token, userId: loadedAdmin._id.toString() });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
