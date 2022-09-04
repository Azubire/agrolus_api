const verifyToken = async (req, next, res) => {
  // decode jwt token from request headers
  const token = req.get("authorization").split(" ")[1];
  if (token) {
    // verify if token is not expired

    // if token is valied ,pass
    next();
  } else {
    return res.status(400).json({ error: true, message: "invalid token" });
  }
  try {
  } catch (error) {}
};
