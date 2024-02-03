const jwt = require("jsonwebtoken");

function tokenVerifier(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({error: "No token provided", statusCode: 401 });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({error: "Invalid access token", statusCode: 401 });
    next();
  });
}

module.exports = tokenVerifier;
