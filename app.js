const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/tours", require("./routes/tourRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

// Error Handler
app.use(errorHandler);

// Server Start
app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
});
