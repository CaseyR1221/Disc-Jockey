const sequelize = require('../config/connection');
const { Disc } = require('../models');

const discData = require('./discData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Disc.bulkCreate(discData, {
    individualHooks: true
  });

  process.exit(0);
};

seedDatabase();