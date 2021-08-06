const router = require('express').Router();


router.get('/', (req,res) => {
    res.render('courses');
});

module.exports = router;