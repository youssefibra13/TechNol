/* ERROR 404 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

/* ERROR HANDLER */
const errorHandler = (error, req, res, next) => {
    if (res.headerSent) {
        //console.log('Error handler triggered but headers already sent');
        return next(error);
    }

    res.status(error.code || 500).json({ message: error.message || 'Internal Server Error' });

}

module.exports = { notFound, errorHandler };