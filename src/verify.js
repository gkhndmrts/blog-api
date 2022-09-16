const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("./error");

const verify = (req, res, next) => {
  const bearerToken = req.header("Authorization");

  if (!bearerToken) {
    throw new AuthorizationError();
  }

  const token = bearerToken.split(" ");

  if (token[0].toLowerCase() !== "bearer") {
    throw new AuthorizationError();
  }

  if (!token[1]) {
    throw new AuthorizationError();
  }

  try {
    const { user } = jwt.verify(token[1], "test");
    req.user = user;

    next();
  } catch (err) {
    throw new AuthorizationError();
  }
};

module.exports = verify;
