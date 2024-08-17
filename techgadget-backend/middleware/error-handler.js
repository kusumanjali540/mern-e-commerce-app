function errorHandler(error, req, res, next) {
  console.log("Oops", error, "End Log");
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data?.map((err) => {
    return err.msg;
  });
  res.status(status).json({ message: message, data: data });
}

module.exports = errorHandler;