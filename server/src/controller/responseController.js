const succeessResponse = (
  res,
  { statusCode = 200, message = "Success", payload }
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload: payload,
  });
};

const errorResponse = (
  res,
  { statusCode = 500, message = "Internal server error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = { succeessResponse, errorResponse };
