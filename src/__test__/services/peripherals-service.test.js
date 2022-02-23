const BaseModelService = require('../../services/basemodel.service')
const modelService = new BaseModelService('Peripheral');

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

describe('Test BaseModelService functions for Peripherals model', () => {
    test("It should return all the peripherals from DB", async () => {
        const limit = 20;
        let offset = 0
        const result = await modelService.list({ offset, limit });
        expect(result).not.toBeNull();
        expect(result.count).toEqual(3);
    })

    test("It should return one or null peripheral from DB", async () => {
        let result = await modelService.find(1);
        expect(result).not.toBeNull();
        expect(result.dataValues.id).toEqual(1);
        result = await modelService.find(100);
        expect(result).toBeNull();
        result = await modelService.find();
        expect(result).toEqual('id is required');
    })

    test("It should update a peripheral", async () => {
        let toUpdate = {
            vendor: 'Vendor test',
            status: 'offline'
        }
        const result = await modelService.save(toUpdate, 1);
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        expect(result.vendor).toEqual(toUpdate.vendor);
    })

    test("It should delete a peripheral", async () => {
        let result = await modelService.delete(1);
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        expect(result.vendor).toEqual(result.vendor);
        result = await modelService.delete(111111);
        expect(result).toEqual('nothing to destroy');
    })
})