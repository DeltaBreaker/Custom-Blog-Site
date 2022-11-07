const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../sql/models");

router.post("/", async (req, res) => {
  try {
    if (req.loggedIn) {
      res.status(401).json({ success: false });
      return;
    }

    const userData = req.body;
    userData.password = await bcrypt.hash(req.body.password, 10);

    await User.create(userData);

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      res.status(200).json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

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

router.post("/login", async (req, res) => {
  try {
    if (req.loggedIn) {
      res.status(401).json({ success: false });
      return;
    }

    let userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(404).json({ success: false });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res.status(200).json({ success: false });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      res.status(200).json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

module.exports = router;
