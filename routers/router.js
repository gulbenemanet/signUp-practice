const router = require('express').Router();
const homePageController = require('../controllers/homePageController');
const profileController = require('../controllers/profileController');
const apiController = require('../controllers/apiController') //.default;
const auth = require('../middleware/auth')
const passport = require('passport')
const signUp = require('../controllers/signUpController')

router.get('/', homePageController);
router.get('/signUp', signUp)
router.get('/profile', (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    }, profileController)
    //router.get('/api', homePageController);
router.get('/api/getAllUsers', apiController.getAllUsers);
router.post('/api/signUp', apiController.signUp)
router.post('/api/signIn', apiController.signIn)
router.get('/api/me', auth, apiController.me)
router.get('/api/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/error',
}), (req, res) => {
    res.redirect('/api/signinwithgoogle')
})
router.get('/api/signinwithgoogle', apiController.signinwithgoogle)
router.get('/api/logout', apiController.logOut)
router.get('/api/error', apiController.errorG)

module.exports = router;