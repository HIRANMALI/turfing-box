import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ code: 401, message: "No authorization header found" })

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

        req.user = { user_id: decoded.user_id, name: decoded.name, email: decoded.email, role: decoded.role }
        next()
    } catch (error) {
        return res.status(401).json({ code: 401, message: "Invalid or Expired token", error: error.message })
    }
}