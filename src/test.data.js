const db = require('./models')

module.exports.init = async function () {
    const gateways = await db['Gateway'].bulkCreate([{
        id: 1,
        name: 'first gateway',
        ip: '192.168.1.1'
    }, {
        id: 2,
        name: 'second gateway',
        ip: '152.206.115.3'
    }])
    return db['Peripheral'].bulkCreate([
        {
            vendor: 'HP',
            GatewayId: gateways[0].id
        },
        {
            vendor: 'AOPEN',
            GatewayId: gateways[0].id,
            status: 'offline'
        },
        {
            vendor: 'IBM',
            GatewayId: gateways[1].id,
        }
    ])

}