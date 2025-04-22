function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); // proceed to route handler
  }
return  res.status(403).json({
    status: "fail",
    code: 403,
    message: "Forbidden. You don't have access to this resource."
  });
}

module.exports = isAuthenticated;
