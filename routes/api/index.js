const router = require('express').Router();
const homeRoutes = require('./user-routes.js');

router.use("/user", homeRoutes);

module.exports = router;