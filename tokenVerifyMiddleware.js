const jwt = require("jsonwebtoken");

function TokenVerifier(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("No token provided");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(401).send("No access");
    next();
  });
}

module.exports = TokenVerifier;
