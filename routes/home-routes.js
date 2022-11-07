const router = require('express').Router();
const { User, Post } = require('../sql/models');

router.get('/', async (req, res) => {
    try {
        let blogData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] }
                }
            ]
        });

        let posts = blogData.map((post) =>
            post.get({ plain: true })
        );

        res.render('home', { display: posts.length > 0, posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;