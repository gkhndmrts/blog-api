const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("../error");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AuthorizationError());
  }

  User.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return next(new AuthorizationError());
      }

      const token = jwt.sign({ email: user.email, name: user.name }, "test", {
        expiresIn: "24h",
      });

      res.send({ token });
    })
    .catch((err) => {
      next(new AuthorizationError());
    });
});

router.put("/", (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return next(new AuthorizationError());
  }

  const user = new User({ email, password, name });

  user
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;
