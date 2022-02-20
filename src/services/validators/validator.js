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
    body('date')
        .not().isEmpty()
        .withMessage('Date can not be empty'),
    body('status')
        .isIn(['online', 'offline'])
        .withMessage('Status values allowed are online and offline'),
    body('gateway_id')
        .not().isEmpty()
        .custom((value, data) => {
            if (!!data.req.params.id)
                return Promise.resolve()
            return db['Peripheral'].findAll({
                where: {
                    gateway_id: value
                }
            }).then(peripherals => {
                if (peripherals.length == 10)
                    return Promise.reject('Peripheral device limit exceeded')
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