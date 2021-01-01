const jwt = require("jsonwebtoken");
const config = require("../config/keys");

exports.ensureAuthenticated = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    return res.status(401).send({
      message: "Token is required.",
    });
  }
};
