const express = require("express");
const morgan = require("morgan");
const { errorHandler } = require("./middleware/errorMiddleware");
const unknownRoute = require("./middleware/unknownRoute");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

// Routes Middleware
app.use("/api/v1/tours", require("./routes/tourRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

// Unknown Route
app.all("*", unknownRoute);

// Error Handler
app.use(errorHandler);

module.exports = app;
