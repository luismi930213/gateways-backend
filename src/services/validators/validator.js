const { body, validationResult } = require('express-validator')
const db = require('../../models')

const gatewaySaveRules = [
    body('name')
        .isLength({ min: 1, max: 255 })
        .withMessage('Name can not be empty'),
    body('ip')
        .isIP()
        .withMessage('Invalid IP address')
]

const peripheralSaveRules = [
    body('vendor')
        .isLength({ min: 1, max: 255 })
        .withMessage('Vendor can not be empty'),
    body('status')
        .isIn(['online', 'offline'])
        .withMessage('Statuses values allowed are online or offline'),
    body('gateway_id')
        .not().isEmpty()
        .custom(async (value, data) => {
            if (!!data.req.params.id) {
                const obj = await db['Peripheral'].findByPk(data.req.params.id)
                if (obj.gateway_id == value)
                    return Promise.resolve()
            }
            return db['Peripheral'].findAll({
                where: {
                    gateway_id: value
                }
            }).then(peripherals => {
                if (!peripherals)
                    return Promise.resolve()
                if (!!peripherals && peripherals.length == 10)
                    return Promise.reject('Only 10 peripherals by gateway allowed')
            })
        }),
]


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(400).json({ errors: errors.array() });
}

module.exports = {
    gatewaySaveRules,
    peripheralSaveRules,
    validate,
}