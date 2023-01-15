const express = require('express')
const router = express.Router()
const path = require('path')
const jwt = require('jsonwebtoken')
const db = require('../models')
const config = require('../config/global.config')
const HttpError = require('../errors/http.error')

router.post('/login', async (req, res, next) => {
    if (!req.body.username || !req.body.password)
        return next(new HttpError('INVALID CREDENTIALS', 403))
    const user = await db['User'].findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    if (!user)
        return next(new HttpError('INVALID CREDENTIALS', 403))
    const userData = Object.assign({}, user.dataValues)    
    const token = jwt.sign({ user: userData.id }, config.secretKey)
    delete userData.password
    res.send({
        token: token,
        user: userData
    })
})

module.exports = {
    path: '/auth',
    order: 1,
    middlewares: [],
    router: router,
    filename: path.basename(__filename)
}