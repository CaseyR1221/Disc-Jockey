const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Disc extends Model {}

Disc.init(
    {
      brandName: {
        type: DataTypes.STRING,
      },
      discName: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      range: {
        type: DataTypes.STRING,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      glide: {
        type: DataTypes.INTEGER,
      },
      turn: {
        type: DataTypes.INTEGER,
      },
      fade: {
        type: DataTypes.INTEGER,
      },
      bestConditions: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      averageCost: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
      underscored: true,
      modelName: 'disc'
    }
  );

  module.exports = Disc;