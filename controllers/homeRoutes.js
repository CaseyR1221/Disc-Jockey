const router = require('express').Router();
const { Disc, Reviews, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   try {
        // Get all reviews and JOIN with user data
        const reviewData = await Reviews.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Disc,
                    attributes: ['discName'],
                },
            ],
        });

        // Serialize data
        if(reviewData) {
            const allReviews = reviewData.map((review) => review.get({ plain: true }));
            console.log(allReviews);

                    // Pass serialized data and session flag into template
            res.render('homepage', {
                allReviews,
                logged_in: req.session.logged_in
            });
        } else {
            res.render('homepage');
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/discs', (req,res) => {
    res.render('discs');
});

router.get('/login', (req,res) => {
    res.render('login');
});



module.exports = router;