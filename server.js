const app = require("./app");

const port = process.env.PORT || 4000;

// Server Start
app.listen(port, () => {
    console.log(`Server Running at port ${port}`);
});
