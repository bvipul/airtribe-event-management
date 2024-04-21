const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        error: "Access Denied",
        code: "ACCESS_DENIED",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(403)
      .json({ error: "Unauthenticated", code: "UNAUTHENTICATED"});
  }
};
