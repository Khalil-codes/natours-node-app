const mongoose = require("mongoose");
const slugify = require("slugify");
const tourSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add Tour Name"],
            unique: true,
            trim: true,
            maxLength: [40, "Tour name must be less or equal than 40 chars"],
            minLength: [10, "Tour name must be greater or equal than 10 chars"],
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, "A Tour must have a duration"],
        },
        maxGroupSize: {
            type: Number,
            required: [true, "A Tour must have a group size"],
        },
        difficulty: {
            type: String,
            required: [true, "A Tour must have a difficulty"],
            enum: {
                values: ["easy", "medium", "difficult"],
                message: "Difficulty should be either easy,medium or difficult",
            },
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, "Rating must be above 1"],
            max: [5, "Rating must be below 5"],
        },
        ratingsQuantity: { type: Number, default: 0 },
        price: { type: Number, required: [true, "Please add Tour Price"] },
        priceDiscount: Number,
        summary: {
            type: String,
            trim: true,
            required: [true, "A Tour must have a summary"],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, "A Tour must have a cover Image"],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtuals
tourSchema.virtual("durationWeeks").get(function () {
    return +(this.duration / 7).toFixed(2);
});

// Document Middleware that runs before .save() or .create()
tourSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Query Middleware that runs before .find() method
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    next();
});

// Aggregation Middleware that runs before every aggregation call
tourSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    next();
});

module.exports = mongoose.model("Tour", tourSchema);
