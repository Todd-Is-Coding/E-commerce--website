const AppError = require("../utils/appError");


const NotFoundHandler = (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};


module.exports = NotFoundHandler;