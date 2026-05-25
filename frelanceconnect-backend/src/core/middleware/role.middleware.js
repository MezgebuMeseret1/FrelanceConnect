export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
export const isClient = (req, res, next) => {
  if (req.user.role !== "CLIENT") {
    return res.status(403).json({
      message: "Only clients can perform this action",
    });
  }
  next();
};