const Jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // decode jwt token from request headers
  if (!req.get("authorization"))
    return res.status(401).json({ error: true, message: "Access Denied" });

  const token = req.get("authorization").split(" ")[1];
  if (!token)
    return res.status(401).json({ error: true, message: "Access Denied" });

  try {
    // verify if token is not expired
    const secret = process.env.JWT_Secret;
    const isTokenValid = Jwt.verify(token, secret);

    req.body.token = { token: token, decodedToken: isTokenValid };
  } catch (error) {
    return res.status(401).json({ error: true, message: "Invalid Token" });
  }

  return next();
};

module.exports = verifyToken;
