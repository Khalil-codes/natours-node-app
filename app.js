const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/tours", require("./routes/routes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
});
