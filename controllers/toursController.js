const Tour = require("../models/toursModel");

// @desc    Get tours
// @route   GET /api/v1/tours
// @access  Public
const getTours = async (req, res) => {
    try {
        //  Filtering
        const queryParams = { ...req.query };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryParams[el]);

        let queryStr = JSON.stringify(queryParams);
        const regexForConditionals = /\b(gte|gt|lte|lt)\b/g;
        queryStr = queryStr.replace(
            regexForConditionals,
            (match) => `$${match}`
        );

        // Querying Based on Filter Query
        let query = Tour.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // Limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // Awaiting Query
        const tours = await query;
        res.status(200).json({
            status: "success",
            results: tours.length,
            data: { tours },
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

// @desc    Get tours
// @route   GET /api/v1/tours
// @access  Public
const getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: { tour },
        });
    } catch {
        res.status(404).json({
            status: "fail",
            message: "Tour not Found",
        });
    }
};
// @desc    Set tours
// @route   POST /api/v1/tours
// @access  Private
const createTour = async (req, res) => {
    try {
        const tour = await Tour.create(req.body);
        res.status(200).json({
            status: "success",
            data: { tour },
        });
    } catch {
        res.status(404).json({
            status: "fail",
            message: "Invalid data sent!!",
        });
    }
};

// @desc    Update tours
// @route   PATCH /api/v1/tours/:id
// @access  Private
const updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: { tour },
        });
    } catch {
        res.status(404).json({
            status: "fail",
            message: "Something went Wrong",
        });
    }
};

// @desc    Delete tours
// @route   DELETE /api/v1/tours/:id
// @access  Private
const deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch {
        res.status(404).json({
            status: "fail",
            message: "Something went Wrong",
        });
    }
};

module.exports = {
    getTours,
    createTour,
    updateTour,
    deleteTour,
    getTourById,
};
