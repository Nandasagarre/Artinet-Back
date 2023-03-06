const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const cors = require('cors');

const cookieparser = require('cookie-parser');
const app = express();
app.use(cors());
const session = require('express-session');
//const passport = require('passport');
//const flash = require('connect-flash');
//const flashmw = require('./config/flashmw');

const db = require('./config/db');
//const googleAuth = require('./config/google_auth')

const port = 4040;

// parser
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('./public/uploads'));
app.use(cookieparser());



//app.set('view engine', 'ejs');
//app.set('views', './views');



app.use(session({
    name: 'auther',
    secret: 'auther',
    saveUninitialized: false,
    resave: false,
    cookie: {

        maxAge: (2000 * 60 * 100)
    },
   
}))

//app.use(passport.initialize());
//app.use(passport.session());

//app.use(flash());
//app.use(flashmw.setFlash);

app.use('/', require('./routes/R_index'));


app.listen(port, () => {
    console.log(`port ${port} active`);
})