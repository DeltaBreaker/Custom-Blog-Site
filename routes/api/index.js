const router = require('express').Router();
const homeRoutes = require('./user-routes.js');
const blogRoutes = require('./blog-routes.js');

router.use("/user", homeRoutes);
router.use("/blog", blogRoutes);

module.exports = router;