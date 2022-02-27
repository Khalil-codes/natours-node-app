const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 400;
    res.status(statusCode);
    res.json({
        status: "fail",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
};

module.exports = { errorHandler };
