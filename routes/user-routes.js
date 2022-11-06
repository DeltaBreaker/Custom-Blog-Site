const router = require('express').Router();

router.get('/login', async (req, res) => {
    try {
        if(req.session.loggedIn) {
            
            return;
        }

        res.render('login', {});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
        if(req.session.loggedIn) {
            
            return;
        }

        res.render('login', {});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;