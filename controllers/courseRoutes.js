const router = require('express').Router();
const { Reviews, User, ScoreCard } = require('../models');


router.get('/', (req,res) => {
    res.render('courses');
});

module.exports = router;

