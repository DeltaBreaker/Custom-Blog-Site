const router = require("express").Router();
const { User, Post, Comment } = require("../sql/models");
const auth = require("../utils/auth.js");

router.get("/new", auth, (req, res) => {
  try {
    res.render("newpost", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let blogData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
          ],
        },
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    let post = blogData.get({ plain: true });

    res.render("post", {
      post,
      commented: post.comments.length > 0,
      editing: false,
      loggedIn: req.session.loggedIn,
      isAuthor: req.session.userId == post.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
