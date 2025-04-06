const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUser } = require("../middlewares/validation");

router.use(auth);  // Apply authentication middleware to all routes below

// Route to get the current user
router.get("/me", getCurrentUser);

// Route to update user info
router.patch("/me", validateUser, updateUser);

module.exports = router;