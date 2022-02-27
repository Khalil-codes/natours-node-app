const express = require("express");
const {
    getAllUsers,
    createUser,
    updateUserById,
    getUserById,
    deleteUserById,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router
    .route("/:id")
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById);

module.exports = router;
