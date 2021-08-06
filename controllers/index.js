const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const courseRoutes = require('./courseRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/courses', courseRoutes);

module.exports = router;