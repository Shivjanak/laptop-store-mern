const jwt = require("jsonwebtoken");

const adminProtect = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      req.admin = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid admin token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = adminProtect;
