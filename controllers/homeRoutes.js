const router = require('express').Router();
const { Disc, Reviews, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   try {
        // Get all reviews and JOIN with user data
        const reviewData = await Reviews.findAll({
            include: [User, Disc]
        });

        // Serialize data
        if(reviewData) {
            const allReviews = reviewData.map((review) => review.get({ plain: true }));
            console.log(allReviews);

            // get 3 random discs for showcase
            const discs = [];
            for(let i = 0; i < 3; i++) {
                discData = await Disc.findByPk(Math.floor(Math.random() * 100));
                discs.push(discData.get({ plain: true }));
            }

        // Pass serialized data and session flag into template
        res.render('homepage', {
            allReviews,
            discs,
            logged_in: req.session.logged_in
        });
        } else {
            res.render('homepage');
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req,res) => {
    res.render('login');
});

router.get('/signup', (req,res) => {
    res.render('signup');
});


module.exports = router;