const router = require("express").Router();
const { User, Post, Comment } = require("../sql/models");
const auth = require("../utils/auth.js");

// Render the home page with all posts
router.get("/", async (req, res) => {
  try {
    let blogData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    let posts = blogData.map((post) => post.get({ plain: true }));

    res.render("home", {
      displayPosts: posts.length > 0,
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Display the user dashboard with all posts created by user
router.get("/dash", auth, async (req, res) => {
  try {
    // Get all posts from user
    let blogData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    let posts = blogData.map((post) => post.get({ plain: true }));

    // Get all comments from user
    let commentData = await Comment.findAll({
      include: [
        {
          model: Post,
        },
      ],
      where: {
        user_id: req.session.userId,
      },
    });
    let comments = commentData.map((post) => post.get({ plain: true }));

    res.render("dash", {
      displayPosts: posts.length > 0,
      displayComments: comments.length > 0,
      posts,
      comments,
      editing: true,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
