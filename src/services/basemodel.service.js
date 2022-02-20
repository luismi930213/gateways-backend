const db = require('../models')

class BaseModelService {

    constructor(modelName) {
        this.modelName = modelName
        this._model = db[this.modelName]
    }

    get model() {
        return this._model
    }

    async list(query) {
        let result
        if (!query)
            query = {}
        if (!!query.hasOwnProperty('offset') && !!query.hasOwnProperty('limit')) {
            result = await this.model.findAndCountAll(query)
            result['skip'] = query.offset
            result['limit'] = +query.limit
            result['pages'] = Math.ceil(result.count / result.limit)
        } else {
            result = this.model.findAll(query)
        }
        return result
    }

    async find(id) {
        if (!id)
            return 'id is required';
        return this.model.findByPk(id)
    }

    async findOne(opts) {
        return this.model.findOne(opts)
    }

    async save(data, id) {
        let instance
        if (!id) {
            instance = await this.model.build(data)
        } else {
            let m = await this.model.findByPk(id)
            instance = await m.update(data)
            return instance.reload()
        }
        return instance.save()
    }

    async delete(id) {
        const data = await this.model.findByPk(id)
        if (!!data)
            return data.destroy()
        else
            return 'nothing to destroy'
    }
}

module.exports = BaseModelService