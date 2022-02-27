const express = require("express");
const router = express.Router();
const {
    getTours,
    setTour,
    updateTour,
    deleteTour,
} = require("../controllers/toursController");

router.get("/", getTours);
router.post("/", setTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);
module.exports = router;
