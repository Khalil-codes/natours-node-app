const fs = require("fs");

// File Stuff
const tours = JSON.parse(
    fs.readFileSync(`./dev-data/data/tours-simple.json`, "utf-8")
);

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

// @desc    Set tours
// @route   POST /api/v1/tours
// @access  Private
const setTour = (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Please Add Data");
    }
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
// @route   PUT /api/v1/tours/:id
// @access  Private
const updateTour = (req, res) => {
    res.status(200).json({ message: `Update Tour ${req.params.id}` });
};

// @desc    Delete tours
// @route   DELETE /api/v1/tours/:id
// @access  Private
const deleteTour = (req, res) => {
    res.status(200).json({ message: `Delete Tour ${req.params.id}` });
};

module.exports = { getTours, setTour, updateTour, deleteTour };
