const handle = (err, req, res, next) => {
  if (err instanceof AuthorizationError) {
    return res.status(401).end();
  }
};

class AuthorizationError {}

module.exports = { handle, AuthorizationError };
