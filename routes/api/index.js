const router = require("express").Router();
const homeRoutes = require("./user-routes.js");
const blogRoutes = require("./post-routes.js");

router.use("/user", homeRoutes);
router.use("/post", blogRoutes);

module.exports = router;
