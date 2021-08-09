const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ScoreCard extends Model {}

ScoreCard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        course_name: {
            type: DataTypes.STRING,
        },
        my_score: {
            type: DataTypes.INTEGER,
        },
        par: {
            type: DataTypes.INTEGER,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'scorecard',
    }
)

module.exports = ScoreCard;