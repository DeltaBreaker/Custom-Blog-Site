const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');

router.use('/', homeRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/api', apiRoutes);

module.exports = router;
