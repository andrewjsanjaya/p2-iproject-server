function errorHandler(err, req, res, next) {
  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError"
  ) {
    err = err.errors.map((error) => error.message);

    res.status(400).json({
      statusCode: 400,
      error: { message: err },
    });
  } else {
    console.log(err);
    res.status(500).json({
      statusCode: 500,
      error: { message: "Internal Server Error" },
    });
  }
}

module.exports = errorHandler;
