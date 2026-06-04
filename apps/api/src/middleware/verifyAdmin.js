
export const verifyAdmin = (req, res, next) => {
    try {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ code: 403, message: "Access denied. No role found." });
        }

        const allowedRoles = ["ADMIN", "SUPER_ADMIN"];

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ code: 403, message: "Access denied. Admins only." });
        }


        next();
    } catch (error) {
        return res.status(500).json({ code: 500, message: "Internal server error during role verification." });
    }
};
