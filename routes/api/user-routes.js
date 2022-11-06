const router = require('express').Router();
const { User } = require('../../sql/models');

router.post("/", async (req, res) => {
    try {
        let response = await User.create(req.body);

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ success: true });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, success: false });
    }
});

router.get("/logout", async (req, res) => {
    try {
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ success: true });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, success: false });
    }
});

router.get("/logout", async (req, res) => {
    try {
        req.session.save(() => {
            req.session.loggedIn = false;
            res.status(200).json({ success: true });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, success: false });
    }
});

module.exports = router;