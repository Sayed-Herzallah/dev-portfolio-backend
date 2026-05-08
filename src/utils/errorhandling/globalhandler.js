// =================================== Global Error Handler ========================================
export const globalErrorHandler = (error, req, res, next) => {
  const status = error.cause || 500;
  return res.status(status).json({
    success: false,
    message: error.message  || "Internal Server Error",
    details: error.details  || undefined,
  });
};
