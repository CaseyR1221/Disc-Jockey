const router = require('express').Router();
const { Disc, Reviews, User } = require('../models');
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');
const { route } = require('./api/userRoutes');

router.get('/', async (req, res) => {
   try {
        // Get all reviews and JOIN with user data
        const reviewData = await Reviews.findAll({
            /*include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],*/
        });

        // Serialize data
        if(reviewData) {
            const reviews = reviewData.map((review) => review.get({ plain: true }));
            console.log(reviews);

                    // Pass serialized data and session flag into template
            res.render('homepage', {
            reviews,
            });
        } else {
            res.render('homepage');
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;