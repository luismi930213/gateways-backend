'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gateway extends Model {
    static associate(models) {
      Gateway.hasMany(models['Peripheral'], {
        onDelete: 'CASCADE'
      })
    }
  };
  Gateway.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING,
      validate: {
        isIPv4: true
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Gateway',
    tableName: 'gateways',
    underscored: true,
  });
  return Gateway;
};