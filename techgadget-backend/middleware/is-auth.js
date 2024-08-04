function isAuth (req, res, next) {
  if (!req.currentAdmin) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  next();
};

module.exports = isAuth;