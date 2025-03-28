const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("User role:", req.user?.role); // Debugging

        if (!req.user || !req.user.role || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = authorizeRoles;
