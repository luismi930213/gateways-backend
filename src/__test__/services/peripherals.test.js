const BaseModelService = require('../../services/basemodel.service')
const modelService = new BaseModelService('Peripheral');

var database = require('../../models');
var testData = require('../../test.data');

beforeAll(async () => {
    await database.sequelize
        .sync()
        .then(() => {
            console.log('database created')
            return testData.init()
        })
        .then(data => console.log('test data created'))
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
        const resultOne = await modelService.find(1);
        const resultTwo = await modelService.find(100);
        const resultThree = await modelService.find();
        expect(resultOne).not.toBeNull();
        expect(resultOne.dataValues.id).toEqual(1);
        expect(resultTwo).toBeNull();
        expect(resultThree).toEqual('id is required');
    })
})