const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ message: "Přístup odepřen" });

  try {
    const verified = jwt.verify(token, "tajnyKlic");
    req.admin = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Neplatný token" });
  }
};

module.exports = verifyToken;
