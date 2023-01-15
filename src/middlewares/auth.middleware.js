const HttpError = require('../errors/http.error')
const db = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/global.config')

const bearer = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization || req.query.authorization
        if (!token)
            next(new HttpError('INVALID CREDENTIALS', 403))
        try {
            const decoded = jwt.verify(token.split(' ')[1], config.secretKey)
            const user = await db['User'].findByPk(decoded.user)
            if (!user)
                next(new HttpError('INVALID CREDENTIALS', 403))
            next()
        } catch (error) {
            console.error(error);
            next(new HttpError('INVALID CREDENTIALS', 403))
        }
    }
}

module.exports = { bearer }