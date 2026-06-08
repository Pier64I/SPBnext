export function notFound(req, res) {
  res.status(404).json({ message: "Resource not found" });
}

export function errorHandler(err, req, res, next) {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }

  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
}
