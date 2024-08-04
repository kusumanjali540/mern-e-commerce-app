const jwt = require("jsonwebtoken");

function currentAdmin(req, res, next) {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, "somesecretkey");
    req.currentAdmin = payload;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  next();
}

module.exports = currentAdmin;
