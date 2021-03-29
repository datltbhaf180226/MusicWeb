const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const auth = require('./controllers/auth')
const home = require('./controllers/home')
const admin = require('./controllers/admin')
const path = require('path')

mongoose.connect('mongodb://localhost/web_music', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.use(cookieParser());
app.use(session({
    key: 'kim',
    secret: 'kim',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24*365
    }
}));

app.use((req, res, next) => {
    if (req.cookies.kim && !req.session.User) {
        res.clearCookie('kim');        
    }
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));


app.listen(3000, () => {
    console.log(`Server started on  port: http://localhost:3000/`)
})




// Tạo url cho client gọi API đến và gọi về chức năng register ở controllers
app.post('/register',auth.register)

// Tạo url và gọi đến chức năng login ở controllers
app.post('/login', auth.login)

// Tạo url và gọi đến chức năng add ở controllers
app.post('/addMusic', admin.add)

//Tạo url và gọi về chuức năng edit ở controllers
app.post('/editMusic/:id',admin.edit)




//Điều hướng đến trang login.ejs
app.get('/login', auth.goLogin)
//Điều hướng đến trang register.ejs
app.get('/register', auth.goRegister)
//Điều hưỚng đến trang musicDetail.ejs
app.get('/detail/:id', home.goDetail)
//Điều hướng đến trang addMusic.ejs
app.get('/addMusic', admin.goAddMusic)
//Điều hướng đến trang editMusic.ejs
app.get('/editMusic/:id', admin.goEditMusic)
// Tạo url và gọi đến chức năng logout ở controllers
app.get('/logout',auth.logout)
// Tạo url trang chủ
app.get('/', home.index)
// Tạo url trang admin
app.get('/admin', admin.admin)

// điều hướng đến trang userLogin
app.get('/userLogin/:id', auth.goUserLogin)














