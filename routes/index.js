const router = require("express").Router();
const { NotFoundError } = require("../utils/error");  // Updated import path
const userRouter = require("./users");
const clothingRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { validateLogin, validateUser } = require("../middlewares/validation");

// Signup and Signin routes
router.post("/signup", validateUser, createUser);
router.post("/signin", validateLogin, login);

// Other routers
router.use("/users", userRouter);
router.use("/items", clothingRouter);

// 404 route for undefined paths
router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
