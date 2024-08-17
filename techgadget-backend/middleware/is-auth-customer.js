function isAuthCustomer (req, res, next) {
  if (!req.currentCustomer) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  next();
};

module.exports = isAuthCustomer;