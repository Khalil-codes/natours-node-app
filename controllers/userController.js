// @desc    Get Users
// @route   GET /api/v1/users
// @access  Public
const getAllUsers = (req, res) => {
    res.status(200).json({
        status: "success",
        results: 10,
        data: {
            users: "<Users Here>",
        },
    });
};

// @desc    Get User
// @route   GET /api/v1/users/:i
// @access  Public
const getUserById = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            user: `<User Here ${req.params.id}>`,
        },
    });
};

// @desc    Create User
// @route   POST /api/v1/users/:id
// @access  Private
const createUser = (req, res) => {
    res.status(201).json({
        status: "success",
        data: {
            user: "<Created User Here>",
        },
    });
};

// @desc    Update User
// @route   Patch /api/v1/users/:id
// @access  Private
const updateUserById = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            user: `<Updated User Here ${req.params.id}>`,
        },
    });
};

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private
const deleteUserById = (req, res) => {
    res.status(204).json({
        status: "success",
        data: {
            user: null,
        },
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
};
