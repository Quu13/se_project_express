const router = require('express').Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItem,
  deleteItem,
  likeItem,
  dislikeItem,
  } = require("../controllers/clothingItems");

  router.get("/", getItem);

  router.use(auth);

  router.post("/", createItem);
  router.delete("/:itemId", deleteItem);
  router.put("/:itemId/likes", likeItem);
  router.delete("/:itemId/likes", dislikeItem);

module.exports = router