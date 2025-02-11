const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");


// router.post("/", createUser);
// router.get("/", getUsers);
// router.get("/:userId", getUser); 

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);


module.exports = router;