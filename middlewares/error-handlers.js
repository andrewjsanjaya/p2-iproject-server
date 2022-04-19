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
  } else if (err.name === "401") {
    res.status(401).json({
      statusCode: 401,
      error: { message: "wrong email or password" },
    });
  } else if (err.name === "Invalid Token" || err.name === "JsonWebTokenError") {
    res.status(401).json({
      statusCode: 401,
      error: { message: "Invalid Token" },
    });
  } else if (err.name === "TokenExpiredError") {
    res.status(401).json({
      statusCode: 401,
      error: { message: "Your Session Has Expired" },
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
