const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).send({ message: "Token missing", success: false });
  }

  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Invalid token", success: false });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
