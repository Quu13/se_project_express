const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");  // Import custom errors

// Get all items
const getItem = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))  // 200 OK
    .catch(next);  // Pass error to the error handler
};

// Create a new item
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))  // 201 Created
    .catch((error) => {
      if (error.name === "ValidationError") {
        return next(new BadRequestError(error.message));
      }
      return next(error);  // Pass other errors to the error handler
    });
};

// Delete an item
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const itemOwner = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");  // throw instead of return next()
      }
      if (item.owner.toString() !== itemOwner) {
        throw new ForbiddenError("You do not have permission to delete this item");
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => {
      res.status(200).send(deletedItem);
    })
    .catch(next);
};

// Like an item
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()  // Will throw DocumentNotFoundError if not found
    .then((item) => res.status(200).send(item))  // 200 OK
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(error);  // Pass other errors to the error handler
    });
};

// Dislike an item
const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()  // Will throw DocumentNotFoundError if not found
    .then((item) => res.status(200).send(item))  // 200 OK
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(error);  // Pass other errors to the error handler
    });
};

module.exports = {
  createItem,
  getItem,
  deleteItem,
  likeItem,
  dislikeItem,
};