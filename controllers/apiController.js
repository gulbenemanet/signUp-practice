const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getAllUsers = (req, res) => {
    User.find()
        .then(sonuc => res.json(sonuc))
}

const signUp = async(req, res) => {
    try {
        var hashedPassword = await bcrypt.hash(req.body.pass, 8);
        const user = User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }, (err, user) => {
            if (err) {
                if (err.code == 11000) {
                    res.json("Emaili değiş...")
                } else if (err) {
                    res.json(err)
                }
            } else {
                res.json(`Ekleme başarılı... 
                    user: ${user}`)
            }
        })
    } catch (err) {
        res.json(err)
        console.log(err);

    }
}

const signIn = async(req, res) => {
    //console.log(req.body);
    const user = await User.findOne({ email: req.body.your_name }, async(err, user) => {
        //console.log(user);
        if (err) {
            res.json(err)
        } else if (!user) {
            res.json('Hatalı bilgi...') // e posta hatalı
        } else {
            bcrypt.compare(req.body.your_pass, user.password, (error, result) => {
                //console.log(req.body.password + user.password);
                if (error) {
                    res.json(error)
                } else if (!result) {
                    res.json('Hatalı bilgi...') // şifre hatalı
                } else if (result) {
                    const token = jwt.sign({ id: user._id }, 'supersecret', {
                        expiresIn: '1h'
                    })
                    res.json({
                        user: user,
                        token: token
                    })
                }

            })
        }
    })
}

const me = (req, res) => {
    res.json(req.user)
}
const signinwithgoogle = (req, res) => {
    // res.json(req.user)
    if (req.user) {
        res.json(req.user)
    } else {
        res.redirect('/')
    }
}

const logOut = (req, res) => {
    req.logout();
    res.redirect('/')
        //res.json(req.user)
}

const errorG = (req, res) => {
    res.json('Hata :(')
}

module.exports = {
    getAllUsers,
    signUp,
    signIn,
    me,
    signinwithgoogle,
    logOut,
    errorG
}