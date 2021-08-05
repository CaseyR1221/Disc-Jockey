const router = require('express').Router();
const { Disc, Reviews, User } = require('../models');
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');
const { route } = require('./api/userRoutes');

router.get('/', async (req, res) => {
    try {
        // Get all reviews and JOIN with user data
        const reviewData = await Reviews.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data
        const reviews = reviewData.map((review) => review.get({ plain: true }));
        console.log(reviews);

        // Pass serialized data and session flag into template
        res.render('homepage', {
            reviews,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});