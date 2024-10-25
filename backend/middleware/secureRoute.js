const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const secureRoute = async (req, res, next) => {
    try {
        // Check if token exists in cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied." });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_TOKEN);
        } catch (err) {
            return res.status(401).json({ error: "Invalid token, authorization denied." });
        }

        // Ensure the token contains the expected payload
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ error: "Malformed token, authorization denied." });
        }

        // Fetch the user from the database
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "No user found." });
        }

       

        // Attach the user to the request object for access in subsequent middleware or routes
        req.user = user;
        next();

    } catch (err) {
        console.error("Error in secureRoute Middleware:", err.message);
        res.status(500).json({ error: "Internal server error." });
    }
}

module.exports = secureRoute;
