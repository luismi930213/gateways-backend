const express = require('express');
const router = express.Router()
const path = require('path')
const validator = require('../services/validators/validator')
const { param } = require('express-validator');

const controller = require('../controllers/gateway.controller')

/**
 * 
 * GET /gateways
 * @description Gets all getaways
 * @summary When you make a request to this route you get all getaways from Database
 * @return {string} 200 - All gateways - application/json
 */
router.get('/',
    async (req, res, next) => {
        const data = await controller.getAll(req.query)
        res.send({ ...data })
    })

/**
* 
* POST /gateways
* @description Gets all getaways
* @summary When you make a request to this route you post one gateway to the Database
* @return {string} 200 - One created gateway - application/json
*/
router.post('/',
    validator.gatewaySaveRules,
    validator.validate,
    async (req, res, next) => {
        delete req.body.id
        const data = await controller.save(req.body)
        res.send({ data: data })
    })

router.get('/:id',
    param('id').isUUID().withMessage('Id is invalid'),
    async (req, res, next) => {
        const data = await controller.getOne(req.params.id)
        res.send({ data: data })
    })

router.put('/:id',
    param('id').isUUID().withMessage('Id is invalid'),
    validator.gatewaySaveRules,
    validator.validate,
    async (req, res, next) => {
        const data = await controller.save(req.body, req.params.id)
        res.send({ data: data })
    })

router.delete('/:id',
    param('id').isUUID().withMessage('Id is invalid'),
    async (req, res, next) => {
        const data = await controller.delete(req.params.id)
        res.send({ data: data })
    })

module.exports = {
    path: '/gateways',
    order: 1,
    middlewares: [],
    router: router,
    filename: path.basename(__filename)
}