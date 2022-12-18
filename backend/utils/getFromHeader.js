const jwt = require("jsonwebtoken");

function getFromHeader(headers, dataType) {
  const authHeader = headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  switch (dataType) {
    case "token":
      return token;

    case "email":
    case "uid":
      let data;
      jwt.verify(token, process.env.JWT_SECRET_KEY, (_, user) => (data = user ? user[dataType] : ""));
      return data;

    default:
      return token;
  }
}

module.exports = getFromHeader;
