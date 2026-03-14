const AppError = require('../utils/appError');
const logger = require('../utils/logger');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const field = err?.keyValue ? Object.keys(err.keyValue)[0] : undefined;
  const value = err?.keyValue && field ? err.keyValue[field] : undefined;
  const message = field
    ? `Duplicate field value: ${field} '${value}'. Please use another value.`
    : 'Duplicate field value. Please use another value.';
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = err?.errors ? Object.values(err.errors) : [];
  const messages = errors.map((e) => e?.message).filter(Boolean);
  const message = messages.length
    ? `Invalid input data. ${messages.join(' ')}`
    : 'Invalid input data.';
  return new AppError(message, 400);
};

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorForProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

const handleJwtInvalidSignature = () => new AppError('Invalid token, please login again..', 401);

const handleJwtExpired = () => new AppError('Expired token, please login again..', 401);

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  logger.error('request_error', {
    message: err.message,
    statusCode: err.statusCode,
    status: err.status,
    isOperational: err.isOperational,
    name: err.name,
    code: err.code,
    path: req.originalUrl,
    method: req.method,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else {
    let error = err;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJwtInvalidSignature();
    if (error.name === 'TokenExpiredError') error = handleJwtExpired();

    if (!error.isOperational) {
      return res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }

    sendErrorForProd(error, res);
  }
};

module.exports = globalErrorHandler;
