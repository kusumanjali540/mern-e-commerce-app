const jwt = require("jsonwebtoken");

function currentCustomer(req, res, next) {
  console.log("Some one called me to get current customer!");
  if (!req.session?.jwt) {
    console.log("No customer!");
    return next();
  }

  try {
    console.log("Y");
    const payload = jwt.verify(req.session.jwt, "somesecretkey");

    // Check if the role is 'user'
    if (payload.role === "customer") {
      req.currentCustomer = payload;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }

  next();
}

module.exports = currentCustomer;
