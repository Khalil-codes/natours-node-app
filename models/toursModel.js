const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add Tour Name"],
        unique: true,
        trim: true,
    },
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
    },
    ratingsAverage: { type: Number, default: 4.5 },
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
    },
    startDates: [Date],
});

module.exports = mongoose.model("Tour", tourSchema);
