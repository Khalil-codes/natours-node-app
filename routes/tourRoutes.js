const express = require("express");
const router = express.Router();
const {
    getTours,
    createTour,
    updateTour,
    deleteTour,
    getTourById,
    aliasTopTours,
    getTourStats,
} = require("../controllers/toursController");

router.route("/top-5-tours").get(aliasTopTours, getTours);
router.route("/tour-stats").get(getTourStats);
router.route("/").get(getTours).post(createTour);
router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
