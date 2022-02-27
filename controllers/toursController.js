const fs = require("fs");

// File Stuff
const tours = JSON.parse(
    fs.readFileSync(`./dev-data/data/tours-simple.json`, "utf-8")
);

// Params middleware
const checkID = (req, res, next, val) => {
    const tour = tours.find((el) => el.id === +val);
    if (!tour) {
        res.status(400);
        throw new Error("Tour Not Found");
    }
    next();
};

// Request Body Middleware
const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        res.status(400);
        throw new Error("Name or Price field is missing");
    }
    next();
};

// @desc    Get tours
// @route   GET /api/v1/tours
// @access  Public
const getTours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: { tours },
    });
};

// @desc    Get tours
// @route   GET /api/v1/tours
// @access  Public
const getTourById = (req, res) => {
    const tour = tours.find((el) => el.id === +req.params.id);

    res.status(200).json({
        status: "success",
        data: { tour },
    });
};
// @desc    Set tours
// @route   POST /api/v1/tours
// @access  Private
const createTour = (req, res) => {
    const newId = tours.at(-1).id + 1;
    const newTour = { id: newId, ...req.body };
    tours.push(newTour);
    fs.writeFile(
        "./dev-data/data/tours-simple.json",
        JSON.stringify(tours),
        (err) => {
            if (err) {
                res.status(400);
                throw new Error("Something went Wrong in Adding the Data");
            }
            res.status(201).json({
                status: "success",
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

// @desc    Update tours
// @route   PATCH /api/v1/tours/:id
// @access  Private
const updateTour = (req, res) => {
    const tour = tours.find((el) => el.id === +req.params.id);

    res.status(200).json({
        status: "success",
        data: { tour: `<Updated Tour ${req.params.id}>` },
    });
};

// @desc    Delete tours
// @route   DELETE /api/v1/tours/:id
// @access  Private
const deleteTour = (req, res) => {
    const tour = tours.find((el) => el.id === +req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
};

module.exports = {
    checkBody,
    checkID,
    getTours,
    createTour,
    updateTour,
    deleteTour,
    getTourById,
};
