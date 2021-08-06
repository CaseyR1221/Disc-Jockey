const router = require('express').Router();
const { Disc, Reviews, User } = require('../models');
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');
const { route } = require('./api/userRoutes');

router.get('/', async (req, res) => {
   try {
        // Get all reviews and JOIN with user data
        const discData = await Disc.findAll({
            
        });

        // Serialize data
        if(discData) {
            const discs = discData.map((disc) => disc.get({ plain: true }));
            console.log(discs);

                    // Pass serialized data and session flag into template
            res.render('Disc', {
            discs,
            });
        } else {
            res.render('Disc');
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;