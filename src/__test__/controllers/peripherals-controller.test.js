const controller = require('../../controllers/peripheral.controller')

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

describe('Test Peripheral Controller functions', () => {
    test("It should return all the peripherals from DB", async () => {
        const result = await controller.getAll({});
        expect(result).not.toBeNull();
        expect(result.count).toEqual(3);
        expect(result.rows[0].dataValues.Gateway).not.toBeNull();
    })

    test("It should return one or null peripheral from DB", async () => {
        let result = await controller.getOne(1);
        expect(result).not.toBeNull();
        expect(result.dataValues.id).toEqual(1);
        result = await controller.getOne(100);
        expect(result).toBeNull();
    })

    test("It should update a peripheral", async () => {
        let toUpdate = {
            vendor: 'Vendor test controller',
            status: 'online'
        }
        const result = await controller.save(toUpdate, 1);
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        expect(result.vendor).toEqual(toUpdate.vendor);
    })

    test("It should delete a peripheral", async () => {
        let result = await controller.delete(1);
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        result = await controller.delete(111111);
        expect(result).toEqual('nothing to destroy');
    })
})