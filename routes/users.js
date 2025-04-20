const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUpdateUser } = require("../middlewares/validation");

router.use(auth);  // Apply authentication middleware to all routes below

// Route to get the current user
router.get("/me", getCurrentUser);

// Route to update user info
router.patch("/me", validateUpdateUser, updateUser);

module.exports = router;