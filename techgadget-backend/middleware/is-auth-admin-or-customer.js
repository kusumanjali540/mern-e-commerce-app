function isAuth (req, res, next) {
    if (!req.currentAdmin && !req.currentCustomer) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
  
    next();
  };
  
  module.exports = isAuth;