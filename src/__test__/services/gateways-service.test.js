const BaseModelService = require('../../services/basemodel.service')
const modelService = new BaseModelService('Gateway');

var database = require('../../models');
var testData = require('../../test.data');

beforeAll(async () => {
    await database.sequelize
        .sync()
        .then(() => {
            return testData.init()
        })
        .catch(err => console.log(err))
});

describe('Test BaseModelService functions for Gateways model', () => {
    test("It should return the gateways from DB", async () => {
        const result = await modelService.list();
        expect(result).not.toBeNull();
        expect(result.length).toEqual(2);
    })

    test("It should return one or null gateway from DB", async () => {
        const data = await modelService.list();
        let result = await modelService.find(data[0].id);
        expect(result).not.toBeNull();
        expect(result.dataValues.id).toEqual(data[0].id);
        result = await modelService.find(100);
        expect(result).toBeNull();
        result = await modelService.find();
        expect(result).toEqual('id is required');
    })

    test("It should create a gateway", async () => {
        const gateway = {
            name: 'Test Gateway',
            ip: '192.168.1.109'
        }
        const result = await modelService.save(gateway);
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        expect(result.name).toEqual(gateway.name);
        expect(result.ip).toEqual(gateway.ip);
    })

    test("It should update a gateway", async () => {
        const gateways = await modelService.list();
        let toUpdate = {
            name: 'Updated gateway'
        }
        const result = await modelService.save(toUpdate, gateways[0].id);
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        expect(result.name).toEqual(toUpdate.name);
    })

    test("It should delete a gateway", async () => {
        const gateways = await modelService.list();
        let result = await modelService.delete(gateways[0].id);
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        expect(result.name).toEqual(gateways[0].name);
        result = await modelService.delete(111111);
        expect(result).toEqual('nothing to destroy');
    })
})