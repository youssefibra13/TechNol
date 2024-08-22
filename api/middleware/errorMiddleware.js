/* ERROR 404 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

/* ERROR HANDLER */
const errorHandler = (error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(res.statusCode || 500).json({message: error.message || 'Internal Server Error'});

}

module.exports = { notFound, errorHandler };