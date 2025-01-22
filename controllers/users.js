const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occured on the server" });
    });
};

const getUser = (req, res) => { const { userId } = req.params;
User.findById(userId)
  .orFail()
  .then((user) => res.status(200).send(user))
  .catch((error) => {
    console.error(error);
    console.log(error.name);
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

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
  .then((user) => res.status(201).send(user))
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

module.exports = { getUsers, getUser, createUser };