const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const courseRoutes = require('./courseRoutes');
const discRoutes = require('./discRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/courses', courseRoutes);
router.use('/discs', discRoutes);

module.exports = router;