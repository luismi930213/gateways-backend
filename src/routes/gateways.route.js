const express = require('express');
const router = express.Router()
const path = require('path')
const BaseModelService = require('../services/basemodel.service')
const modelService = new BaseModelService('Gateway')
const validator = require('../services/validators/validator')
const { param } = require('express-validator')

router.get('/',
    async (req, res, next) => {
        const limit = req.query.limit || 20;
        const page = req.query.page;
        const skip = req.query.skip
        let offset = 0
        let include = { association: 'Peripherals' }
        if (page)
            offset = (page - 1) * limit
        else if (skip)
            offset = skip
        const data = await modelService.list({ include, offset, limit })
        res.send({ ...data })
    })

router.post('/',
    validator.gatewaySaveRules,
    validator.validate,
    async (req, res, next) => {
        delete req.body.id
        const data = await modelService.save(req.body)
        res.send({ data: data })
    })

router.get('/:id',
    param('id').isUUID().withMessage('Id is invalid'),
    async (req, res, next) => {
        const data = await modelService.find(req.params.id, {
            include: {
                association: 'Peripherals'
            }
        })
        res.send({ data: data })
    })

router.put('/:id',
    param('id').isUUID().withMessage('Id is invalid'),
    validator.gatewaySaveRules,
    validator.validate,
    async (req, res, next) => {
        const data = await modelService.save(req.body, req.params.id)
        res.send({ data: data })
    })

router.delete('/:id',
    param('id').isUUID().withMessage('Id is invalid'),
    async (req, res, next) => {
        const data = await modelService.delete(req.params.id)
        res.send({ data: data })
    })

module.exports = {
    path: '/gateways',
    order: 1,
    middlewares: [],
    router: router,
    filename: path.basename(__filename)
}