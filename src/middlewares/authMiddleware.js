const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        try {
            console.log("Verifying token...");

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            console.log("The decoded user is:", req.user);

            next();
        } catch (err) {
            console.error("JWT Verification Error:", err);
            return res.status(400).json({ message: "Token is not valid" });
        }
    } else {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
};

module.exports = verifyToken;
