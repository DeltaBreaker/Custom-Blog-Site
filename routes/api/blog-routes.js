const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const { User, Post } = require('../../sql/models');
const auth = require('../../utils/auth.js');

router.post("/", auth, async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                username: req.session.username
            }
        });

        let blogData = { user_id: user.id, ...req.body };

        await Post.create(blogData);
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, success: false });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        if(!req.session.loggedIn) {
            res.status(401).json({ success: false });
            return false;
        }

        let user = await User.findOne({
            where: {
                username: req.session.username
            }
        });

        let result = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: user.id
            }
        });

        if(!result) {
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