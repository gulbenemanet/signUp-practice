const express = require('express')
const app = express();
const ejs = require('ejs');
const result = require('dotenv').config()
const cors = require('cors');
const path = require('path');
const router = require('./routers/router');
require('./db/db')
const passport = require('passport');
require('./middleware/passport')
const session = require('cookie-session');


app.use(function(error, req, res, next) {
    if (error instanceof SyntaxError) { //Handle SyntaxError here.
        return res.status(500).send({ data: "Invalid data" });
    } else {
        next();
    }
});
app.use(cors());
app.use(express.urlencoded({
    'extended': 'true'
}));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

app.use(session({
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    keys: ['deneme']
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
if (result.error) {
    throw result.error
}

app.listen(process.env.PORT, () => {
    console.log('Sunucu ayağa kaldırıldı.');
})