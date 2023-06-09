module.exports = async function auth(req, res, next) {
    const jwt = require('jsonwebtoken')
    const User = require('../Models/userModel')
    try {
        console.log(req.headers);
        const token = await (req.headers['authorization'] || req.headers['authorization'].split(' ')[1])
            //console.log(token);
        if (token == null) {
            return res.json('Token hatası')
        }
        const sonuc = jwt.verify(token, 'supersecret')

        console.log(sonuc);
        const bulunan = await User.findById(sonuc.id)
        req.user = bulunan
        next()
    } catch (err) {
        console.log(err);
        res.json(err)
    }
}