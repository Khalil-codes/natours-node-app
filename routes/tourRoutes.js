const express = require("express");
const router = express.Router();
const {
    getTours,
    createTour,
    updateTour,
    deleteTour,
    getTourById,
} = require("../controllers/toursController");

router.route("/").get(getTours).post(createTour);
router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
