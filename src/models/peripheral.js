'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peripheral extends Model {
    static associate(models) {
      Peripheral.belongsTo(models['Gateway'], {
        foreignKey: 'gateway_id',
        onDelete: 'CASCADE'
      })
    }
  };
  Peripheral.init({
    vendor: {
      type: DataTypes.STRING,
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