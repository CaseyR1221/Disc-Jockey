const Disc = require('./Disc');
const Reviews = require('./Reviews');
const Scorecard = require('./ScoreCard');
const User = require('./User');

User.hasMany(Scorecard, {
    foreignKey: 'user_id',
})

Scorecard.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Reviews, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    hooks: true
});

Disc.hasMany(Reviews, {
    foreignKey: 'disc_id',
})

module.exports= { User, Disc, Reviews, Scorecard }; 