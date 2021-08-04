const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Scorecard extends Model {}

Scorecard.init(
    {
        course_name: {
            type: DataTypes.STRING,
        },
        my_score: {
            type: DataTypes.INTEGER,
        },
        par: {
            type: DataTypes.INTEGER,
        }
    }
)