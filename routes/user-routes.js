const router = require("express").Router();

// Displays the login page unless already logged in
router.get("/login", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }

    res.render("login", {});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
