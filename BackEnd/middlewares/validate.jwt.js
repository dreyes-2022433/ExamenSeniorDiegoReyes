import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'


export const validateJwt = async (req, res, next) => {
    try {
        const secretKey = process.env.JWT_SECRET
        if (!secretKey) {
            return res.status(500).send({
                success: false,
                message: 'Internal server error: SECRET_KEY missing'
            })
        }
        const rawToken = req.headers['authorization'] || req.headers['Authorization']
        if (!rawToken) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized: Token missing'
            })
        }

        const token = rawToken.startsWith('Bearer ')
            ? rawToken.split(' ')[1]
            : rawToken

        let decoded
        try {
            decoded = jwt.verify(token, secretKey)
        } catch (err) {
            return res.status(401).send({
                success: false,
                message: 'Invalid or expired token'
            })
        }
        next()
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: err.message
        })
    }
}

