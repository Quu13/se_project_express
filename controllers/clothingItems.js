const ClothingItem = require("../models/clothingItem");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  SERVER_ERROR,
} = require("../utils/errors");

const getItem = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      console.error(error);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((error) => {
      console.error(error);
      if (error.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: error.message });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const itemOwner = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        throw new Error("NotFound");
      }
      if (item.owner.toString() !== itemOwner) {
        throw new Error("Forbidden");
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((item) => res.status(OK).send(item))
    .catch((error) => {
      console.error(error);
      if (error.message === "NotFound") {
        return res.status(NOT_FOUND).send({ message: error.message });
      }
      if (error.message === "Forbidden") {
        return res.status(FORBIDDEN).send({ message: error.message });
      }
      if (error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: error.message });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      console.error(error);
      if (error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: error.message });
      }
      if (error.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: error.message });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      console.error(error);

      if (error.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: error.message });
      }
      if (error.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: error.message });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
