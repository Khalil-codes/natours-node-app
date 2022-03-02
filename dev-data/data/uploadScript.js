const mongoose = require("mongoose");
const connectDB = require("../../config/db");
const dotenv = require("dotenv").config();
const fs = require("fs");
const Tour = require("../../models/toursModel");
// MongoDB Connection
connectDB();

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// Import Script
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data Loaded");
    } catch (error) {
        console.log(error);
    } finally {
        process.exit();
    }
};

// Delete Data
const deleteAllData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data Deleted");
    } catch (error) {
        console.log(error);
    } finally {
        process.exit();
    }
};

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteAllData();
}
