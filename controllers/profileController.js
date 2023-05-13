module.exports = (req, res) => {
    res.render('profile', {
        user: req.user
    })
}