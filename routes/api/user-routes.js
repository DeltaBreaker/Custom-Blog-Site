const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../sql/models");

// This handles creating a new user with given info
router.post("/", async (req, res) => {
  try {
    if (req.loggedIn) {
      res.status(401).json({ success: false });
      return;
    }

    // Hash the given password
    const userData = req.body;
    userData.password = await bcrypt.hash(req.body.password, 10);

    let user = await User.create(userData);

    // Save data to the session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      req.session.userId = user.dataValues.id;
      res.status(200).json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

// Log the user out and destroy the session data
router.get("/logout", async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(200).json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

// Check the user login info and save the session
router.post("/login", async (req, res) => {
  try {
    if (req.loggedIn) {
      res.status(401).json({ success: false });
      return;
    }

    // Get user data to check if the user exists
    let userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(404).json({ success: false });
      return;
    }

    // Check the given password with the stored hash
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res.status(200).json({ success: false });
      return;
    }

    // Save the session data
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      req.session.userId = userData.dataValues.id;
      res.status(200).json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

module.exports = router;
