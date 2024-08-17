const jwt = require("jsonwebtoken");

function currentAdmin(req, res, next) {
  console.log("Someone called me to get current admin1!");
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, "somesecretkey");

    // Check if the role is 'admin'
    if (payload.role === "admin") {
      req.currentAdmin = payload;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  next();
}

module.exports = currentAdmin;
