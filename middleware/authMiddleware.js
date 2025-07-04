const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = user; // Attach user to request
    next(); // Move to next middleware/route
  } catch (error) {
    return res.status(403).json({ error: "Invalid token." }); // Forbidden
  }
};
