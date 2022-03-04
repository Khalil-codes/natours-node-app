const Tour = require("../models/toursModel");
const APIFeatures = require("../utils/apiFeatures");

const aliasTopTours = (req, res, next) => {
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty";
    next();
};

// @desc    Get tours
// @route   GET /api/v1/tours
// @access  Public
const getTours = async (req, res) => {
    try {
        // Awaiting Query
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .limitFields()
            .sort()
            .paginate();
        const tours = await features.query;

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

const getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } },
            },
            {
                $group: {
                    _id: {
                        $toUpper: "$difficulty",
                    },
                    totalTours: { $sum: 1 },
                    totalRatings: { $sum: "$ratingsQuantity" },
                    avgRating: { $avg: "$ratingsAverage" },
                    avgPrice: { $avg: "$price" },
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" },
                },
            },
            {
                $project: {
                    avgRating: {
                        $trunc: ["$avgRating", 2],
                    },
                    avgPrice: {
                        $trunc: ["$avgPrice", 2],
                    },
                    minPrice: 1,
                    maxPrice: 1,
                    totalRatings: 1,
                    totalTours: 1,
                },
            },
            {
                $sort: {
                    avgPrice: 1,
                },
            },
        ]);
        res.status(200).json({
            status: "success",
            data: stats,
        });
    } catch (error) {
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
    aliasTopTours,
    getTourStats,
};
