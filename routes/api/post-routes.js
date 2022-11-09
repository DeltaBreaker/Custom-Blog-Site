const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
const { User, Post, Comment } = require("../../sql/models");
const auth = require("../../utils/auth.js");

router.post("/", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(401).json({ success: false });
      return false;
    }

    let date =
      new Date().getMonth() +
      "/" +
      new Date().getDay() +
      "/" +
      new Date().getFullYear();

    let blogData = { user_id: req.session.userId, ...req.body, date };

    await Post.create(blogData);
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(401).json({ success: false });
      return false;
    }

    let result = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });

    if (!result) {
      res.status(404).json({ success: false });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(401).json({ success: false });
      return false;
    }

    let post = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });

    if (!post) {
      res.status(404).json({ success: false });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

//----- Routes for comments -----

router.post("/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(401).json({ success: false });
      return false;
    }

    let user = await User.findOne({
      where: {
        username: req.session.username,
      },
    });

    let date =
      new Date().getMonth() +
      "/" +
      new Date().getDay() +
      "/" +
      new Date().getFullYear();

    let commentData = {
      user_id: user.id,
      post_id: req.params.id,
      ...req.body,
      date,
    };

    await Comment.create(commentData);
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

router.put("/comment/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(401).json({ success: false });
      return false;
    }

    let comment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });

    if (!comment) {
      res.status(404).json({ success: false });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

router.delete("/comment/:id", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(401).json({ success: false });
      return false;
    }

    let comment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });

    console.log(comment);

    if (!comment) {
      res.status(404).json({ success: false });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

module.exports = router;
