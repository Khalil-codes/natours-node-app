const app = require("./app");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const port = process.env.PORT || 4000;

// MongoDB Connection
connectDB();

// Server Start
app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
});
