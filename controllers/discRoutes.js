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

            // Pass serialized data and session flag into template
            res.render('discs', {
                discs,
            });
        } else {
            res.render('discs');
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const discData = await Disc.findByPk(req.params.id);

      const reviewData = await Reviews.findAll({
        where: { disc_id: req.params.id },
        include: User,
      });
  
      const disc = discData.get({ plain: true });
      const reviews = reviewData.map((review) => review.get({ plain: true }));

      console.log(disc);

      res.render('singleDisc', {
        disc,
        reviews,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;