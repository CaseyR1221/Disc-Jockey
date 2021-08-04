const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Disc extends Model {}

Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      brandName: {
        type: DataTypes.STRING,
      },
      discName: {
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
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      averageCost: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      modelName: 'disc',
    }
  );