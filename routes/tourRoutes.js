const express = require("express");
const router = express.Router();
const {
    getTours,
    createTour,
    updateTour,
    deleteTour,
    getTourById,
    checkID,
    checkBody,
} = require("../controllers/toursController");

router.param("id", checkID);
router.route("/").get(getTours).post(checkBody, createTour);
router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
