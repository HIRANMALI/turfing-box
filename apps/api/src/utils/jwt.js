import jwt from 'jsonwebtoken'

export const generateRefreshToken = (data) => {
    return jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d"
    })
}

export const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m',
    });
};