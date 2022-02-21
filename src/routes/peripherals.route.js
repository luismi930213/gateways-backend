const express = require('express');
const router = express.Router()
const path = require('path')
const BaseModelService = require('../services/basemodel.service')
const modelService = new BaseModelService('Peripheral')
const validator = require('../services/validators/validator')

router.get('/',
    async (req, res, next) => {
        const limit = req.query.limit || 20;
        const page = req.query.page;
        const skip = req.query.skip
        const include = { association: 'Gateway', require: true }
        let offset = 0
        if (page)
            offset = (page - 1) * limit
        else if (skip)
            offset = skip
        const data = await modelService.list({ include, offset, limit })
        res.send({ ...data })
    })

router.post('/',
    validator.peripheralSaveRules,
    validator.validate,
    async (req, res, next) => {
        const data = await modelService.save(req.body)
        res.send({ data: data })
    })

router.get('/:id',
    async (req, res, next) => {
        const data = await modelService.find(req.params.id)
        res.send({ data: data })
    })

router.put('/:id',
    validator.peripheralSaveRules,
    validator.validate,
    async (req, res, next) => {
        const data = await modelService.save(req.body, req.params.id)
        res.send({ data: data })
    })

router.delete('/:id',
    async (req, res, next) => {
        const data = await modelService.delete(req.params.id)
        res.send({ data: data })
    })

module.exports = {
    path: '/peripherals',
    order: 1,
    middlewares: [],
    router: router,
    filename: path.basename(__filename)
}