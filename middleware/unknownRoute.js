module.exports = unknownRoute = (req, res, next) => {
    res.status(404).json({
        staus: "fail",
        message: `Can't find ${req.originalUrl} on server`,
    });
};
