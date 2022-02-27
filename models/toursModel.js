const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add Tour Name"],
            unique: true,
        },
        rating: { type: Number, default: 4.5 },
        price: { type: Number, required: [true, "Please add Tour Price"] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
