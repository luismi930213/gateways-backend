const BaseModelService = require('../services/basemodel.service');
const modelService = new BaseModelService('Peripheral');

const getAll = (query) => {
    const limit = query.limit || 20;
    const page = query.page;
    const skip = query.skip
    const include = { association: 'Gateway', require: true }
    let offset = 0
    if (page)
        offset = (page - 1) * limit
    else if (skip)
        offset = skip
    return modelService.list({ include, offset, limit });
}

const getOne = (id) => {
    return modelService.find(id, {
        include: {
            association: 'Peripherals'
        }
    })
}

const save = (body, id) => {
    if (!!id)
        return modelService.save(body, id)
    return modelService.save(body)
}

const remove = (id) => {
    return modelService.delete(id)
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    save: save,
    delete: remove
}