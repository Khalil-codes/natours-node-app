const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    createUser,
    updateUserById,
    getUserById,
    deleteUserById,
} = require("../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);
router
    .route("/:id")
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById);

module.exports = router;
