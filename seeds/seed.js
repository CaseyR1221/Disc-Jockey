const sequelize = require('../config/connection');
const { Disc, User, Reviews } = require('../models');

const discData = require('./discData.json');
const userData = require('./userData.json');
const reviewData = require('./reviewData.json')

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await Disc.bulkCreate(discData);
    console.log('\n----- DISCS SYNCED -----\n');

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log('\n----- USERS SYNCED -----\n');
    
    await Reviews.bulkCreate(reviewData);
    console.log('\n----- REVIEWS SYNCED -----\n');

    process.exit(0);
  } catch (err) {
    console.log(err);
  }
  
};

seedDatabase();

