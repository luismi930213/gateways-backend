'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peripheral extends Model {
    static associate(models) {
      Peripheral.belongsTo(models['Gateway'])
    }
  };
  Peripheral.init({
    vendor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'online'
    }
  }, {
    sequelize,
    modelName: 'Peripheral',
    tableName: 'peripherals',
    underscored: true,
  });
  return Peripheral;
};